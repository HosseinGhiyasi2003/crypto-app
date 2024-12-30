import chartDown from '../../assets/chart-down.svg'
import chartUp from '../../assets/chart-up.svg'

function TableRow({ image, symbol, name, current_price,
  price_change_percentage_24h: price_change, total_volume }) {
  return (
    <tr className='border-b-[1px] border-[#22262e] h-20 text-[1.1rem] font-semibold'>
      <td className='flex mt-6 gap-2'>
        <img src={image} alt="" className='w-6 h-6' />
        <span className='text-[#9fa6b7]'>{symbol.toUpperCase()}</span>
      </td>
      <td>{name}</td>
      <td>${current_price.toLocaleString()}</td>
      <td className={price_change > 0 ? 'text-green-500' : 'text-[#d33636]'}>{price_change.toFixed(2)}%</td>
      <td>{total_volume.toLocaleString()}</td>
      <td><img src={price_change > 0 ? chartUp : chartDown} alt="" /></td>
    </tr>
  );
}

export default TableRow;
