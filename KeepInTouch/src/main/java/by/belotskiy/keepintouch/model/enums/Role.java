package by.belotskiy.keepintouch.model;

public enum Role {
    USER("ROLE_USER"),
    REDACTOR("ROLE_REDACTOR"),
    ADMIN("ROLE_ADMIN");

    private final String name;

    Role(String name){
        this.name = name;
    }
    public String getName(){
        return this.name ;
    }

    @Override
    public String toString() {
        return this.name;
    }
}
