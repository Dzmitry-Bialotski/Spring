package by.belotskiy.keepintouch.model;


import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String login;

    @Column
    private String password;


    @Enumerated(EnumType.STRING)
    private Role role;
}
