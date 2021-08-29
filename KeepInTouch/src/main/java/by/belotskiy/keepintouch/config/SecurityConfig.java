package by.belotskiy.keepintouch.config;

import by.belotskiy.keepintouch.config.jwt.JwtFilter;
import by.belotskiy.keepintouch.config.security.RestAccessDeniedHandler;
import by.belotskiy.keepintouch.config.security.RestAuthenticationEntryPoint;
import by.belotskiy.keepintouch.exception.handler.FilterChainExceptionHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtFilter jwtFilter;

    @Autowired
    private RestAccessDeniedHandler accessDeniedHandler;
    @Autowired
    private RestAuthenticationEntryPoint authenticationEntryPoint;
    @Autowired
    private FilterChainExceptionHandler filterChainExceptionHandler;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    private static final String[] AUTH_LIST = {
            // -- swagger ui
            "**/swagger-resources/**",
            "/swagger-ui.html",
            "/v2/api-docs",
            "/webjars/**"
    };
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and()
                .addFilterBefore(filterChainExceptionHandler, ChannelProcessingFilter.class)
                .httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers(AUTH_LIST).permitAll()
                .antMatchers("/register", "/auth").permitAll()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/news/**").hasAnyRole("USER", "ADMIN", "REDACTOR")
                .antMatchers(HttpMethod.POST, "/news/**").hasAnyRole("ADMIN", "REDACTOR")
                .antMatchers(HttpMethod.PUT, "/news/**").hasAnyRole("ADMIN", "REDACTOR")
                .antMatchers(HttpMethod.DELETE, "/news/**").hasAnyRole("ADMIN", "REDACTOR")
                .antMatchers("/comments/**").hasAnyRole("USER", "ADMIN", "REDACTOR")
                .antMatchers("/likes/**").hasAnyRole("USER", "ADMIN", "REDACTOR")
                .and()
                .exceptionHandling()
                .accessDeniedHandler(accessDeniedHandler)
                .authenticationEntryPoint(authenticationEntryPoint)
                .and()
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    }

}
