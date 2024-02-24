import { useGetRestaurant } from '@/api/RetaurantApi';
import CheckoutButton from '@/components/CheckoutButton';
import MenuItemCard from '@/components/MenuItemCard';
import OrderSummary from '@/components/OrderSummary';
import RestaurantInfo from '@/components/RestaurantInfo';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardFooter } from '@/components/ui/card';
import { UserFormData } from '@/forms/user-profile-form/UserProfileForm';
import { MenuItem } from '@/types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export type CartItem = {
    _id: string;
    name: string;
    price: string;
    quantity: number;
}

export default function DetailPage() {
    const { restaurantId } = useParams();
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        const storeCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storeCartItems ? JSON.parse(storeCartItems) : []
    });


    const addToCart = (menuItem: MenuItem) => {
        setCartItems((prevCartItems) => {
            // check if the item is already in the cart
            const existingCartItem = prevCartItems.find((cartItem) => cartItem._id === menuItem._id);
            // if item is in the cart, then update the quantity
            let updatedCartItems;

            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((cartItem) =>
                    cartItem._id === menuItem._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                );
            }
            // if item is not in cart, add it to cart 
            else {
                updatedCartItems = [
                    ...prevCartItems,
                    {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1, // quantitywill be 1
                    }
                ]
            }
            // STORING LOCAL STORAGE
            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            )
            return updatedCartItems;
        })
    }

    const removeFromCart = (cartItem: CartItem) => {
        setCartItems((prevCartItems) => {
            const updatedCartItems = prevCartItems.filter(
                (item) => cartItem._id !== item._id
            );
            // STORING LOCAL STORAGE
            sessionStorage.setItem(
                `cartItems-${restaurantId}`,
                JSON.stringify(updatedCartItems)
            )
            return updatedCartItems;
        })
    }

    const { restaurant, isLoading } = useGetRestaurant(restaurantId);


    const onCheckout = (userFormData:UserFormData) => {
        console.log("userFormData", userFormData)
    }

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
                        <MenuItemCard key={menuItem._id} menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
                        <CardFooter>
                            <CheckoutButton disabled={cartItems.length === 0} onCheckout={onCheckout} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
