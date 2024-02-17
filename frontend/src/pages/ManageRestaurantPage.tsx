import { useCreateRestaurant } from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/manage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
    const { createRestaurant, isLoading } = useCreateRestaurant();
    return (
        <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
    )
}
