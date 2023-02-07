package house.jpashophse.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final String CORS_ALLOWED_METHODS = "GET,POST,HEAD,PUT,PATCH,DELETE,TRACE,OPTIONS";
    private static final String MAIN_SERVER_DOMAIN = "";
    private static final String MAIN_SERVER_WWW_DOMAIN = "";
    private static final String TEST_SERVER_DOMAIN = "";
    private static final String FRONTEND_LOCALHOST_DEV = "http://localhost:5173";
    private static final String FRONTEND_LOCALHOST_BUILD = "http://localhost:4173";

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods(CORS_ALLOWED_METHODS.split(","))
                .allowedOrigins( FRONTEND_LOCALHOST_DEV, FRONTEND_LOCALHOST_BUILD)
                .allowCredentials(true)
                .exposedHeaders(HttpHeaders.LOCATION, HttpHeaders.SET_COOKIE, "X-AUTH-TOKEN");
    }
}
