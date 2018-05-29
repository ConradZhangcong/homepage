package com.conrad.blog.domain;

/**
 * 返回结果对象
 */
public class Result<T> {
    private Integer code; // 错误码
    private String message; // 处理后的消息提示
    private T data; // 返回的数据

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setBody(T data) {
        this.data = data;
    }
}
