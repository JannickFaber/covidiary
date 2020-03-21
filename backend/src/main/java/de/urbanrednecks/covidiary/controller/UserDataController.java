package de.urbanrednecks.covidiary.controller;

import de.urbanrednecks.covidiary.entities.WeekResult;
import de.urbanrednecks.covidiary.services.UserDataService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@CrossOrigin("*")
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
    @PostMapping({"/score/{userId}", "/score"})
    public String saveWeeklyScore(
            @ApiParam("The weekly result to save.") @RequestBody WeekResult weekResult,
            @ApiParam("The unique object id of the user to save the results for.") @PathVariable(required = false) String userId
    ) {
        return userDataService.saveWeeklyScore(userId, weekResult);
    }

    @ApiOperation(
            value = "Get the average contact score over all weeks.",
            produces = "A double value of the average contact score over all weeks."
    )
    @GetMapping("/score/contact/global")
    public double getGlobalContactScore() {
        return userDataService.getContactScore();
    }

    @ApiOperation(
            value = "Get the average location score over all weeks.",
            produces = "A double value of the average location score over all weeks."
    )
    @GetMapping("/score/location/global")
    public double getGlobalLocationScore() {
        return userDataService.getLocationScore();
    }

    @ApiOperation(
            value = "Get the average contact score over a specific week.",
            consumes = "The first day of the week to get the scores for.",
            produces = "A double value of the average contact score over specific week."
    )
    @GetMapping("/score/contact/{firstDayOfWeek}")
    public double getWeeklyContactScore(
            @ApiParam("The first day of the specified week as LocalDate") @PathVariable String firstDayOfWeek
    ) {
        return userDataService.getContactScore(LocalDate.parse(firstDayOfWeek));
    }

    @ApiOperation(
            value = "Get the average location score over a specific week.",
            consumes = "The first day of the week to get the scores for.",
            produces = "A double value of the average location score over specific week."
    )
    @GetMapping("/score/location/{firstDayOfWeek}")
    public double getWeeklyLocationScore(
            @ApiParam("The first day of the specified week as LocalDate") @PathVariable String firstDayOfWeek
    ) {
        return userDataService.getLocationScore(LocalDate.parse(firstDayOfWeek));
    }
}
