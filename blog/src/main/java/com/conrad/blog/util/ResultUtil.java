package com.conrad.blog.util;

import com.conrad.blog.domain.Result;

/**
 * 返回结果对象的处理工具
 */
public class ResultUtil {

    public static Result success() {
        return success(null);
    }

    /**
     * 处理成功 code:0 message:成功 object:json格式
     *
     * @param object
     * @return
     */
    public static Result success(Object object) {
        Result result = new Result();
        result.setCode(0);
        result.setMessage("成功");
        result.setBody(object);
        return result;
    }

    /**
     * 失败后的提示
     *
     * @param code    错误码
     * @param message 错误信息
     * @return
     */
    public static Result error(Integer code, String message) {
        Result result = new Result();
        result.setCode(code);
        result.setMessage(message);
        return result;
    }
}
