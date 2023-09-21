/*
 * Author : Mushib Khan
 * Date : 27-04-2023
 * Created with : IntelliJ IDEA Community Edition
 */

package com.niit.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND,reason = "Not Found")
public class BillNotFoundException extends Exception{
    public BillNotFoundException() {
    }

    public BillNotFoundException(String message) {
        super(message);
    }
}
