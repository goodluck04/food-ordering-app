import { useGetRestaurant } from '@/api/RetaurantApi';
import MenuItemCard from '@/components/MenuItemCard';
import RestaurantInfo from '@/components/RestaurantInfo';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useParams } from 'react-router-dom'

export default function DetailPage() {
    const { restaurantId } = useParams();

    const { restaurant, isLoading } = useGetRestaurant(restaurantId);

    if (isLoading || !restaurant) {
        return "Loading..."
    }


    return (
        <div className='flex flex-col gap-10'>
            <AspectRatio ratio={16 / 5}>
                <img className='rounded-md object-cover h-full w-full' src={restaurant.imageUrl} alt="" />
            </AspectRatio>
            <div className='grid md:grid-cols-[4fr_2fr] gap-4 md:px-32'>
                <div className='flex flex-col gap-4'>
                    <RestaurantInfo restaurant={restaurant} />
                    <span className='text-2xl font-bold tracking-tight'>Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItemCard key={menuItem._id} menuItem={menuItem} />
                    ))}
                </div>
            </div>
        </div>
    )
}
