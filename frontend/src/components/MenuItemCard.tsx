import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
    menuItem: MenuItem;
}

export default function MenuItemCard({ menuItem }: Props) {
    return (
        <Card className="cursor-pointer">
            <CardHeader>
                <CardTitle>{menuItem.name}</CardTitle>
            </CardHeader>
            <CardContent className="font-bold">
                ${(parseInt(menuItem.price) / 100).toFixed(2)}
            </CardContent>
        </Card>
    )
}