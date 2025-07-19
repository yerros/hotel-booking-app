import { Stack } from "expo-router"

export default function BookingLayout(){
    return (
        <Stack>
         <Stack.Screen name="index" options={{ headerShown: false }} />
         <Stack.Screen name="bookings" options={{ headerShown: false }} />
        </Stack>
    )
}