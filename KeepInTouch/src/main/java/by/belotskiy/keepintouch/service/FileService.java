package by.belotskiy.keepintouch.service;

import by.belotskiy.keepintouch.model.News;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileService {

    @Value("${upload.path}")
    private String uploadPath;

    public News saveNewsPhoto(MultipartFile file, News news) {
        if (file != null){
            if (file.getOriginalFilename() != null && !file.getOriginalFilename().isEmpty()) {
                File uploadDir = new File(uploadPath);
                if(!uploadDir.exists()){
                    uploadDir.mkdir();
                }
                String uuidFile = UUID.randomUUID().toString();
                String resultFilename = uuidFile + file.getOriginalFilename();
                news.setUrlToImage(resultFilename);
                try{
                    file.transferTo(new File(uploadPath + '/' + resultFilename));
                }catch(IOException e){
                    throw new RuntimeException("Something wrong during uploading file!", e);
                }
            }
        }
        return news;
    }
}
