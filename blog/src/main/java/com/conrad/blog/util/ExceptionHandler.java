package com.conrad.blog.util;

import org.apache.tomcat.util.buf.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;

/**
 * ExceptionHandler 处理器
 */
public class ExceptionHandler {

    private final static Logger logger = LoggerFactory.getLogger(ExceptionHandler.class);

    public static String getMessage(ConstraintViolationException e){
        List<String> msgList = new ArrayList<>();
        for(ConstraintViolation<?> constraintViolation:e.getConstraintViolations()){
            msgList.add(constraintViolation.getMessage());
        }
        String messages = StringUtils.join(msgList, ';');
        return messages;
    }
}