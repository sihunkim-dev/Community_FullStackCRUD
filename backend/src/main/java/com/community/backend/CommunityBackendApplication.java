package com.community.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})public class CommunityBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommunityBackendApplication.class, args);
	}

}
