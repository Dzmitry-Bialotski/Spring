package by.belotskiy.keepintouch.controller;

import by.belotskiy.keepintouch.config.CustomUserDetails;
import by.belotskiy.keepintouch.service.LikeService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/likes/{newsId}")
public class LikeController {

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    /**
     *
     * @return true if like is placed
     */
    @PostMapping
    public boolean placeOrRemoveLike(@PathVariable String newsId, @AuthenticationPrincipal CustomUserDetails userDetails){
        return likeService.placeOrRemove(userDetails.getId(), Integer.parseInt(newsId));
    }
}
