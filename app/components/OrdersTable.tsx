/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

export function OrdersTable({ orders }: { orders: any[] }) {
    return (
        <div className="space-y-2 max-h-80 overflow-y-auto">
            {orders.slice().sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ).map(order => (
                <div
                    key={order.id}
                    className="p-3 rounded-xl bg-gray-800 flex flex-col gap-2"
                >
                    {/* Header */}
                    <div className="flex justify-between text-xs text-gray-400">
                        <span>ID: {order.id.slice(-6)}</span>
                        <span>
                            {new Date(order.createdAt).toLocaleTimeString()}
                        </span>
                    </div>

                    {/* Items */}
                    <div className="text-sm">
                        {order.items.map((item: any, i: number) => (
                            <div key={i} className="flex justify-between">
                                <span>
                                    {item.quantity}x {item.name}
                                </span>
                                <span>${item.price * item.quantity}</span>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="flex justify-between font-bold text-green-400">
                        <span>Total</span>
                        <span>${order.total}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}