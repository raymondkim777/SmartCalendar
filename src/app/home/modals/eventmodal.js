import GoogleMap from "@/app/components/map";
import { formatDate } from "@/app/timeformat";

const EventModal = ({ closeEvent, eventDetails }) => (
    <div style={{top: '50%', left: '50%', transform: 'translate(-50%, -43%)'}} className={`flex flex-col items-center z-10 absolute w-96 lg:w-[32rem] xl:w-[36rem] object-center top-60 h-fit mr-2 pt-1 rounded-lg border border-neutral-400 bg-stone-50 overflow-hidden`}>
        <div className='flex flex-row w-full h-10 items-center justify-between pl-4 pr-2 space-x-3'>
            <h1 className="text-lg text-nowrap truncate leading-6 text-gray-600 font-semibold">{eventDetails.get('title')}</h1>
            <div onClick={closeEvent} className='flex items-center justify-center w-9 h-9 rounded-full hover:cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-all duration-300'>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#696969" fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"/>
                </svg>
            </div>
        </div>
        <div className='flex flex-col w-full h-fit max-h-64 lg:max-h-[32rem] xl:max-h-[40rem] items-center justify-start py-4 px-4 space-y-4 overflow-y-auto'>
            {/* Times */}
            <div className='flex flex-row w-full h-12 items-center justify-start space-x-4 px-2'>
                <div className='flex flex-col w-fit h-fit items-start justify-center'>
                    <span className='text-base leading-6 text-gray-600 font-normal'>From: </span>
                    <span className='text-base leading-6 text-gray-600 font-normal'>Until: </span>
                </div>
                <div className='flex flex-col grow h-12 items-start justify-center'>
                    <span className='text-base leading-6 text-gray-600 font-normal'>{formatDate(eventDetails.get('start'))}</span>
                    <span className='text-base leading-6 text-gray-600 font-normal'>{formatDate(eventDetails.get('end'))}</span>
                </div>
            </div>
            {
                eventDetails.get('description') && eventDetails.get('description') != '' && 
                <div className='flex flex-row w-full h-fit items-center justify-start space-x-4 px-2'>
                    <span className='text-base leading-6 text-gray-600 font-normal'>Description: </span>
                    <span className='text-base leading-6 line-clamp-3 text-gray-600 font-normal'>{eventDetails.get('description')} </span>
                </div>
            }
            {/* Location */}
            {
                eventDetails.get('location') && eventDetails.get('location') != '' && 
                <div className='flex flex-col w-full h-fit items-center justify-start space-y-4'>
                    <div className='flex flex-row w-full h-fit items-center justify-start space-x-4 px-2'>
                        <span className='text-base leading-6 text-gray-600 font-normal'>Location: </span>
                        <span className='text-base text-wrap leading-6 text-gray-600 font-normal'>{eventDetails.get('location')} </span>
                    </div>
                    {
                        eventDetails.get('coordinate') && 
                        <div className='w-full h-64 overflow-hidden bg-gray-200 rounded-lg'>
                            <GoogleMap coordinates={eventDetails.get('coordinate')} />
                        </div>
                    }
                </div>
            }
        </div>
    </div>
)

export default EventModal;