package de.urbanrednecks.covidiary.dtos;

public class WeekResultDto {

    private double locationScore;
    private double contactScore;

    public WeekResultDto() {
    }

    public WeekResultDto(double locationScore, double contactScore) {
        this.locationScore = locationScore;
        this.contactScore = contactScore;
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
