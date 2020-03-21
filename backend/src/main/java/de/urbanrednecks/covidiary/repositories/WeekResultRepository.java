package de.urbanrednecks.covidiary.repositories;

import de.urbanrednecks.covidiary.entities.WeekResult;
import org.springframework.data.repository.CrudRepository;


public interface WeekResultRepository extends CrudRepository<WeekResult, Long> {
}
