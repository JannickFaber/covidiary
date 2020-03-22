package de.urbanrednecks.covidiary.dtos;

public class UserDto {
    private String objectId;

    public UserDto() {
    }

    public UserDto(String objectId) {
        this.objectId = objectId;
    }

    public String getObjectId() {
        return objectId;
    }

    public void setObjectId(String objectId) {
        this.objectId = objectId;
    }
}
