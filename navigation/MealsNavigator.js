import React from 'react';
import { Platform, Text } from 'react-native';

import { Ionicons } from '@expo/vector-icons';


import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Colors from '../constants/Colors';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {    
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor    
}

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: CategoryMealsScreen,
    MealDetail: MealDetailScreen
}, {
    mode: 'modal',
    defaultNavigationOptions: defaultStackNavOptions
});

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});


const tabScreenConfig = {
        AllMeals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarLabel: 'All Meals',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
        },
        tabBarColor: Colors.primaryColor,
        tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>All Meals</Text> : 'All Meals'
    }
        },
        Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel: 'Favorites!',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
        },
        tabBarColor: Colors.accentColor,
        tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> : 'Favorites'

    }
        }
}

const MealsFavTabNavigator = 
        Platform.OS === 'android' 
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
                activeTintColor: 'white',
                shifting: true,
                barStyle: {
                    backgroundColor: Colors.primaryColor
                }
        }) 
        : createBottomTabNavigator(tabScreenConfig, {
                tabBarOptions: {
                    labelStyle: {
                        fontFamily: 'open-sans-bold'
                    },
                    activeTintColor: Colors.accentColor
            }
});

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
}, {
    defaultNavigationOptions: defaultStackNavOptions
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: {screen: MealsFavTabNavigator, navigationOptions: {
        drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans-bold'
        }
    }
});

export default createAppContainer(MainNavigator);