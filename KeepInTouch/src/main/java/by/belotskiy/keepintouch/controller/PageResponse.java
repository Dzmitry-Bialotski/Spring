package by.belotskiy.keepintouch.controller;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PageResponse<T> {
    private final List<T> items;
    private final int size;
    private final int page;
}
