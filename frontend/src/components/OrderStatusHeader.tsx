import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-stauts-config";

type Props = {
    order: Order;
}

export default function OrderStatusHeader({ order }: Props) {

    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt);

        created.setMinutes(
            created.getMinutes() + order.restaurant.estimatedDeliveryTime
        );

        const hours = created.getHours();
        const minutes = created.getMinutes();
        //12:05 adding zero for lessa than 10 min 
        const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${paddedMinutes}`;
    }

    const getOrderStatusInfo = () => {
        return ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0];
    }

    return (
        <>
            <h1 className="text-4xl font-bold tracking-tight flex  flex-col gap-5 md:flex-row md:justify-between">
                <span>Order Status: {order.status}</span>
                <span>Expected by : {getExpectedDelivery()}</span>
            </h1>
            <Progress value={getOrderStatusInfo().progressValue} className="animate-pulse" />
        </>
    )
}