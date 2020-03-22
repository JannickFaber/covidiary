package de.urbanrednecks.covidiary.controller;

import de.urbanrednecks.covidiary.dtos.UserDto;
import de.urbanrednecks.covidiary.dtos.WeekResultDto;
import de.urbanrednecks.covidiary.entities.WeekResult;
import de.urbanrednecks.covidiary.services.UserDataService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
public class UserDataController {

    private final UserDataService userDataService;

    @Autowired
    public UserDataController(UserDataService userDataService) {
        this.userDataService = userDataService;
    }

    @ApiOperation(
            value = "Save a week result for a user",
            consumes = "Consumes a unique object id to identify the user. If userId is not set, a new unique object id will be generated.",
            produces = "Produces the unique object id of the user, or a new UUID for the user to identify themselves."
    )
    @PostMapping(value = {"/score/{userId}", "/score"}, consumes = MediaType.APPLICATION_JSON_VALUE)
    public UserDto saveWeeklyScore(
            @ApiParam("The weekly result to save.") @RequestBody WeekResultDto weekResult,
            @ApiParam("The unique object id of the user to save the results for.") @PathVariable(required = false) String userId
    ) {
        return userDataService.saveWeeklyScore(userId, weekResult);
    }

    @ApiOperation(
            value = "Get the average score over all weeks.",
            produces = "A double value of the average score over all weeks."
    )
    @GetMapping("/score/get/global")
    public WeekResultDto getGlobalLocationScore() {
        return userDataService.getGlobalScore();
    }

    @ApiOperation(
            value = "Get the average score over a specific week.",
            consumes = "The first day of the week to get the scores for.",
            produces = "A double value of the average score over specific week."
    )
    @GetMapping("/score/get/{firstDayOfWeek}")
    public WeekResultDto getWeeklyContactScore(
            @ApiParam("The first day of the specified week as LocalDate") @PathVariable String firstDayOfWeek
    ) {
        return userDataService.getWeeklyScore(LocalDate.parse(firstDayOfWeek));
    }
}
