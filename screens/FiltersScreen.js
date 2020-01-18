import React, { useState, useEffect, useCallback } from 'react';
import {View, Text, StyleSheet, Switch, Platform} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import {setFilters } from '../store/actions/mealsAction'

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
                <Switch 
                        trackColor={{true: Colors.accentColor}}
                        thumbColor={Platform.OS === 'android' ? Colors.primaryColor : ''}
                        value={props.value} 
                        onValueChange={props.onChange} 
                        />
        </View>
    )
}


const FiltersScreen = props => {
    const { navigation } = props;

    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isVegetarian, setIsVegetarian] = useState(false);

    const dispatch = useDispatch();

    const saveFilters = useCallback(() => {
        const appliedFilters = {
            glutenFree: isGlutenFree,
            lactoseFree: isLactoseFree,
            vegan: isVegan,
            vegetarian: isVegetarian
        };

        dispatch(setFilters(appliedFilters));

        navigation.navigate('Meal Categories');
    }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]);

    useEffect(() => {
        navigation.setParams({save: saveFilters});
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <FilterSwitch 
                label='Gluten-Free' 
                value={isGlutenFree} 
                onChange={newValue => setIsGlutenFree(newValue)} 
            />
            <FilterSwitch 
                label='Lactose-Free' 
                value={isLactoseFree} 
                onChange={newValue => setIsLactoseFree(newValue)} 
            />
            <FilterSwitch 
                label='Vegan' 
                value={isVegan} 
                onChange={newValue => setIsVegan(newValue)} 
            />
            <FilterSwitch 
                label='Vegetarian' 
                value={isVegetarian} 
                onChange={newValue => setIsVegetarian(newValue)} 
            />
        </View>
    );
};

FiltersScreen.navigationOptions = (navData) => {
    return {
    headerTitle: 'Filtered Meals',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item   title="Menu" 
                iconName='ios-menu' 
                onPress={() => {
                    navData.navigation.toggleDrawer();
                    }} 
        />
        </HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item   title="Save" 
                iconName='ios-save' 
                onPress={navData.navigation.getParam('save')}
        />
        </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        fontFamily: 'open-sans-bold',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    }
});

export default FiltersScreen;