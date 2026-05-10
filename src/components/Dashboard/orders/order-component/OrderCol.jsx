import React from 'react';
import { HiOutlineEye } from 'react-icons/hi2';
import Badge from './Badge';
import { fmt } from '../../../../utils';

const OrderCol = ({order,ORDER_STATUSES,STATUS_CONFIG, quickStatus, DELIVERY_CONFIG, PAYMENT_CONFIG,setSelectedOrder}) => {
    const {_id,order_date,order_status,customer,pricing,items,shipping_address,payment,note} = order || [];
    const date = new Date(order_date);
    return (
        <tr
            key={_id}
            className="hover:bg-orange-50/30 transition-colors group"
        >
            {/* ID */}
            <td className="px-4 py-3.5 font-bold text-gray-800 whitespace-nowrap">
                {_id}
            </td>

            {/* Customer */}
            <td className="px-4 py-3.5 whitespace-nowrap">
                <div className="flex items-center gap-2">
                    <span
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 bg-(--orange-hot)"
                    >
                        {customer.name[0]}
                    </span>
                    <div>
                        <p className="font-semibold text-gray-700 text-xs">{customer.name}</p>
                        <p className="text-gray-400 text-[11px]">{shipping_address.district_name}</p>
                    </div>
                </div>
            </td>

            {/* Date */}
            <td className="px-4 py-3.5 text-gray-500 text-xs whitespace-nowrap">
                {date.toLocaleString()}
            </td>

            {/* Items */}
            <td className="px-4 py-3.5 text-xs text-gray-500 max-w-[160px]">
                <p className="truncate">{items.map(i => i.product_name).join(", ")}</p>
                <p className="text-gray-400">{items.length} item{order.items.length > 1 ? "s" : ""}</p>
            </td>

            {/* Total */}
            <td className="px-4 py-3.5 font-bold whitespace-nowrap text-(--orange-hot)">
                {fmt(pricing.total)}
            </td>

            {/* Status — inline quick change */}
            <td className="px-4 py-3.5">
                <select
                    value={order_status}
                    onChange={e => quickStatus(order.id, e.target.value)}
                    className="text-xs font-bold rounded-xl px-2 py-1  cursor-pointer focus:outline-none transition-all"
                >
                    {ORDER_STATUSES.map(s => (
                        <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                    ))}
                </select>
            </td>

            {/* Payment */}
            <td className="px-4 py-3.5">
                {/* <Badge cfg={PAYMENT_CONFIG[order.payment]} /> */} Processing
            </td>

            {/* Delivery */}
            <td className="px-4 py-3.5 whitespace-nowrap text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                    {/* {DELIVERY_CONFIG[order.delivery]?.icon}
                    {DELIVERY_CONFIG[order.delivery]?.label} */} icon hobe
                </span>
            </td>

            {/* Actions */}
            <td className="px-4 py-3.5">
                <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white transition-all hover:brightness-110 shadow-sm whitespace-nowrap bg-(--orange-hot)"
                >
                    <HiOutlineEye size={13} /> Manage
                </button>
            </td>
        </tr>
    );
};

export default OrderCol;