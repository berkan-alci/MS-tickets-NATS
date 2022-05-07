import mongoose from 'mongoose';
import { OrderStatus } from '@tt-ms-common/common';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface OrderAttrs {
    id: string;
    userId: string;
    version: number;
    status: OrderStatus;
    price: number;
}

interface OrderDoc extends mongoose.Document {
    userId: string;
    version: number;
    status: OrderStatus;
    price: number;
};

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
    findByEvent(data: { id: string, version: number }): Promise<OrderDoc | null>;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(OrderStatus)
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});
orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.findByEvent = (data: { id: string, version: number }) => {
    return Order.findOne({
        _id: data.id,
        version: data.version - 1
    })
};

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order({
        _id: attrs.id,
        version: attrs.version,
        price: attrs.price,
        userId: attrs.userId,
        status: attrs.status,
    })
}

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export default Order;