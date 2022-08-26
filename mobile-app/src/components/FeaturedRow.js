import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import client from "../../sanity";

export default function FeaturedRow({
  id,
  title,
  description,
  featuredCategory,
}) {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    client.fetch(`
      *[_type == "featured" && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type-> {
            name
          }
        },
      }[0]
    `,
    { id })
    .then((data) => {
      setRestaurants(data?.restaurants)
    });
  },[]);

  console.log("Restaurants", restaurants, true)
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-4 pb-2"
      >
        {/* Restaurant Cards */}
        {
          restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
          ))
        }
        
      </ScrollView>
    </View>
  );
}
