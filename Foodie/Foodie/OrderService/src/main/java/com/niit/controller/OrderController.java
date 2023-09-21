/*
 * Author : Mushib Khan
 * Date : 03-04-2023
 * Created with : IntelliJ IDEA Community Edition
 */

package com.niit.controller;

import com.niit.domain.Cuisine;
import com.niit.domain.Order;
import com.niit.exception.CuisineNotFoundException;
import com.niit.exception.OrderAlreadyExistsException;
import com.niit.exception.OrderNotFoundException;
import com.niit.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/user/addOrder/{emailId}")
    public ResponseEntity<?> addOrder(@RequestBody Order order, @PathVariable String emailId) throws OrderAlreadyExistsException {
        try {
            Order orderAdded = orderService.addOrder(order, emailId);
            if (orderAdded == null) {
                throw new OrderAlreadyExistsException();
            } else {
                return new ResponseEntity<Order>(orderAdded, HttpStatus.OK);
            }
        } catch (Exception exception) {
            return new ResponseEntity<String>("Error Occurred while trying to add order", HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping("/getOrder")
    public ResponseEntity<?> getOrder() {
        try {
            List<Order> order = orderService.getOrder();
            if (order == null) {
                throw new OrderNotFoundException();
            } else {
                return new ResponseEntity<List<Order>>(order, HttpStatus.OK);
            }
        } catch (Exception exception) {
            return new ResponseEntity<>("Error Occurred while trying to fetch order", HttpStatus.NOT_FOUND);
        }
    }
}
