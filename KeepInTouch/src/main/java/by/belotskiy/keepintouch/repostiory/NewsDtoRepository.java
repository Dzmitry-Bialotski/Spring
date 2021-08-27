package by.belotskiy.keepintouch.repostiory;

import by.belotskiy.keepintouch.controller.dto.NewsDto;

import java.util.Optional;

public interface NewsDtoRepository {
    Optional<NewsDto> findNewsWithLikesById(int newsId);
}
