package de.urbanrednecks.covidiary.repositories;

import de.urbanrednecks.covidiary.entities.UserMapper;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface UserRepository extends CrudRepository<UserMapper, Long> {
    UserMapper findByObjectId(String uuid);
}
