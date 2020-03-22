package de.urbanrednecks.covidiary.entities;

import io.swagger.annotations.ApiModelProperty;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class WeekResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ApiModelProperty(notes = "The first day of the selected Week to identify the week. Type is LocalDate.")
    private LocalDate firstDay;

    @ApiModelProperty(notes = "The location score for this week.")
    private double locationScore;

    @ApiModelProperty(notes = "The contact score for this week.")
    private double contactScore;

    public WeekResult() {}

    public WeekResult(LocalDate firstDay, double locationScore, double contactScore) {
        this.firstDay = firstDay;
        this.locationScore = locationScore;
        this.contactScore = contactScore;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getFirstDay() {
        return firstDay;
    }

    public void setFirstDay(LocalDate firstDay) {
        this.firstDay = firstDay;
    }

    public double getLocationScore() {
        return locationScore;
    }

    public void setLocationScore(double locationScore) {
        this.locationScore = locationScore;
    }

    public double getContactScore() {
        return contactScore;
    }

    public void setContactScore(double contactScore) {
        this.contactScore = contactScore;
    }
}
