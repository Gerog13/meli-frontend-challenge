import { IoInformationOutline } from 'react-icons/io5';

export default function ShippingInfoAlert() {
  return (
    <div className="flex items-center gap-2 rounded-sm meli-md:max-w-[744px] meli-md:mx-auto bg-white px-4 py-3 border-b border-gray-100">
      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-meli-blue/90">
        <IoInformationOutline className="text-white" size={12} />
      </span>
      <span className="text-xs text-[rgba(0,0,0,.55)] font-normal">
        El envío gratis está sujeto al peso, precio y la distancia del envío.
      </span>
    </div>
  );
}
