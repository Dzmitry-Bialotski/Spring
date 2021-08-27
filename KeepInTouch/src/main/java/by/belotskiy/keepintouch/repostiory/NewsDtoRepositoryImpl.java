package by.belotskiy.keepintouch.repostiory;

import by.belotskiy.keepintouch.controller.dto.NewsDto;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigInteger;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public class NewsDtoRepositoryImpl implements NewsDtoRepository{

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Optional<NewsDto> findNewsWithLikesById(int newsId){
        final String sql = "SELECT n.id,\n" +
                "                n.content,\n" +
                "                n.description,\n" +
                "                n.published_at,\n" +
                "                n.source_name,\n" +
                "                n.title,\n" +
                "                n.url,\n" +
                "                n.url_to_image,\n" +
                "                u.login,\n" +
                "                count(likes), " +
                "                CASE WHEN EXISTS (SELECT * FROM likes l where l.user_id = 3 and l.news_id = :newsId)\n" +
                "                   THEN 1\n" +
                "                   ELSE 0\n" +
                "                END AS liked" +
                "        FROM news n\n" +
                "        LEFT JOIN likes ON n.id = likes.news_id\n" +
                "        LEFT JOIN users u on n.user_id = u.id\n" +
                "        WHERE n.id = :newsId\n" +
                "        GROUP BY n.id, u.login;";
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("newsId", newsId);
        final List result = query.getResultList();
        for(Object res: result){
            Object[] row = (Object[]) res;
            NewsDto newsDto = NewsDto.builder()
                    .id((Integer)row[0])
                    .content((String)row[1])
                    .description((String)row[2])
                    .publishedAt(((Timestamp)row[3]).toInstant().toString())
                    .sourceName((String)row[4])
                    .title((String)row[5])
                    .url((String)row[6])
                    .urlToImage((String)row[7])
                    .author((String)row[8])
                    .likesCount(((BigInteger)row[9]).intValue())
                    .liked((Integer) row[10] == 1)
                    .build();
            return Optional.of(newsDto);
        }
        return Optional.empty();
    }
}
