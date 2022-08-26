import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon } from "react-native-heroicons/outline"
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import client from '../../sanity';
export default function HomeScreen() {

  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    })
  }, []);

  useEffect(() => {
    client.fetch(`
      *[_type == "featured"] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->
        }
      }
    `)
    .then((data) => {
      setFeaturedCategories(data)
    });
  },[]);

  console.log(featuredCategories);
  return (
    <SafeAreaView className="bg-white pt-5">
        {/* Header */}
        <View className="flex-row pb-3 items-center px-3 my-2 space-x-2">
          <Image 
            source={{
              uri: "https://links.papareact.com/wru"
            }}
            className="h-8 w-8 bg-gray-300 rounded-full"  
          />
          <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
            <Text className="font-bold text-xl">
              Current Location
              <ChevronDownIcon size={20} color="#00CCBB"/>
            </Text>
          </View>
          <UserIcon size={33} color="#00CCBB"/>
        </View>
        {/* Search */}
        <View className="flex-row items-center space-x-2 pb-2 px-3 rounded-lg">
          <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
            <MagnifyingGlassIcon size={20} color="gray"/>
            <TextInput
              placeholder='Restaurants and cuisines'
              keyboardType='default'
            />
          </View>
          <AdjustmentsVerticalIcon color="#00CCBB"/>
        </View>
        {/* Body */}
        <ScrollView className="bg-gray-100">
          {/* Categories */}
          <Categories/>

          {/* Featured */}
          {
            featuredCategories?.map((category) => (
              <FeaturedRow
                key={category._id}
                id={category._id}
                title={category.name}
                description={category.short_description}
              />
            ))
          }
        </ScrollView>
    </SafeAreaView>
  )
}