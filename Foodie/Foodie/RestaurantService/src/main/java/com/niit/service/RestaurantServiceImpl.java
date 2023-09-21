
/*
 * Author : Mushib Khan
 * Date : 03-04-2023
 * Created with : IntelliJ IDEA Community Edition
 */

package com.niit.service;


import com.niit.domain.Cuisine;
import com.niit.domain.Restaurant;
import com.niit.exception.CuisineAlreadyExistsException;
import com.niit.exception.CuisineNotFoundException;
import com.niit.exception.RestaurantAlreadyExistsException;
import com.niit.exception.RestaurantNotFoundException;
import com.niit.repository.RestaurantRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    private RestaurantRepo restaurantRepo;


    @Autowired
    public RestaurantServiceImpl(RestaurantRepo restaurantRepo) {
        this.restaurantRepo = restaurantRepo;
    }

    @Override
    public Restaurant addRestaurant(Restaurant restaurant) throws RestaurantAlreadyExistsException {
        if (restaurantRepo.findById(restaurant.getRestaurantId()).isPresent()) {
            throw new RestaurantAlreadyExistsException();
        }
        return restaurantRepo.save(restaurant);
    }

    @Override
    public List<Restaurant> getAllRestaurant() throws RestaurantNotFoundException {
        List<Restaurant> allRestro = restaurantRepo.findAll();
        if (allRestro.isEmpty()) {
            throw new RestaurantNotFoundException();
        }
        return allRestro;
    }

    @Override
    public Restaurant addCuisine(int restaurantId, Cuisine cuisine) throws CuisineAlreadyExistsException, RestaurantNotFoundException {
        if (restaurantRepo.findById(restaurantId).isEmpty()) {
            throw new RestaurantNotFoundException();
        }
        Restaurant restaurantById = restaurantRepo.findById(restaurantId).get();
        if (restaurantById.getCuisineList() == null) {
            restaurantById.setCuisineList(Arrays.asList(cuisine));
        } else if (restaurantById.getCuisineList().contains(cuisine)) {
            throw new CuisineAlreadyExistsException();
        } else {
            restaurantById.getCuisineList().add(cuisine);
        }
        return restaurantRepo.save(restaurantById);
    }

    @Override
    public List<Cuisine> getAllCuisine(int restaurantId) throws CuisineNotFoundException, RestaurantNotFoundException {
        if (restaurantRepo.findById(restaurantId).isEmpty()) {
            throw new RestaurantNotFoundException();
        }
        Restaurant restaurant = restaurantRepo.findById(restaurantId).get();
        if (restaurant.getCuisineList().isEmpty()) {
            throw new CuisineNotFoundException();
        }
        return restaurant.getCuisineList();
    }


    @Override
    public List<Restaurant> restaurantSearchByLocation(String restaurantLocation) throws RestaurantNotFoundException {
        if (restaurantRepo.findByLocation(restaurantLocation).isEmpty()) {
            throw new RestaurantNotFoundException();
        }
        List<Restaurant> byLocation = restaurantRepo.findByLocation(restaurantLocation);
        return byLocation;
    }



    @Override
    public List<Cuisine> updateCuisine(int restaurantId, int cuisineId, Cuisine cuisine) throws RestaurantNotFoundException, CuisineNotFoundException {
        if (restaurantRepo.findById(restaurantId).isEmpty()) {
            throw new RestaurantNotFoundException();
        }
        Restaurant restaurant = restaurantRepo.findById(restaurantId).get();
        boolean cuisineFound = false;

        for (Cuisine existingCuisine : restaurant.getCuisineList()) {
            if (existingCuisine.getCuisineId() == cuisineId) {
                existingCuisine.setCuisineName(cuisine.getCuisineName());
                existingCuisine.setCuisinePrice(cuisine.getCuisinePrice());
                existingCuisine.setDescription(cuisine.getDescription());
                existingCuisine.setCuisineImage(cuisine.getCuisineImage());
                cuisineFound = true;
                break; // Exit the loop once the cuisine is updated
            }
        }

        if (!cuisineFound) {
            throw new CuisineNotFoundException();
        }

        restaurantRepo.save(restaurant);
        return restaurant.getCuisineList();
    }



    @Override
    public List<Cuisine> deleteCuisine(int restaurantId, int cuisineId) throws RestaurantNotFoundException, CuisineNotFoundException {
        boolean found = false;
        if (restaurantRepo.findById(restaurantId).isEmpty()) {
            throw new RestaurantNotFoundException();
        }
        Restaurant restaurant = restaurantRepo.findById(restaurantId).get();
        List<Cuisine> cuisineList = restaurant.getCuisineList();
        found = cuisineList.removeIf(cuisine -> cuisine.getCuisineId() == cuisineId);

        if (!found) {
            throw new CuisineNotFoundException();
        }
        restaurantRepo.save(restaurant);
        return restaurant.getCuisineList();
    }

    @Override
    public Restaurant getRestaurantById(int restaurantId) throws RestaurantNotFoundException {
        if (restaurantRepo.findById(restaurantId).isEmpty()) {
            throw new RestaurantNotFoundException();
        }
        Restaurant restaurant = restaurantRepo.findById(restaurantId).get();

        return restaurant;
    }
}
