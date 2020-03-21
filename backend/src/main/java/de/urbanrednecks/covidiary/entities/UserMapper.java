package de.urbanrednecks.covidiary.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class UserMapper {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String objectId;
    private LocalDate createdAt;
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<WeekResult> weekResults;

    public UserMapper() {
        this.objectId = UUID.randomUUID().toString();
        this.createdAt = LocalDate.now();
        this.weekResults = new ArrayList<>();
    }

    public void addToWeekResults(WeekResult result) {
        weekResults.add(result);
    }

    public Long getId() {
        return id;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public List<WeekResult> getWeekResults() {
        return weekResults;
    }

    public String getObjectId() {
        return objectId;
    }
}
