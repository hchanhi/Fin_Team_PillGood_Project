package com.pg.controller;

import com.pg.config.CurrentUser;
import com.pg.model.Supplements;
import com.pg.model.TakingLog;
import com.pg.service.PrincipalDetails;
import com.pg.service.TakingLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

// 복용 기록 API — 대상 유저는 항상 로그인한 본인이다
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TakingLogController {
    final private TakingLogService takingLogService;

    @PostMapping("/supplements/check")
    public TakingLog supplementsCheck(@CurrentUser PrincipalDetails currentUser, @RequestBody HashMap<String, String> params) {
        return takingLogService.addTakingLog(currentUser.getNickname(), params.get("supplementsName"));
    }

    @GetMapping("/supplements/eatenlist")
    public List<Supplements> eantenList(@CurrentUser PrincipalDetails currentUser) {
        return takingLogService.selectEatenSupplements(currentUser.getNickname());
    }

    @GetMapping("/supplements/takinglog")
    public List<Integer> takingLoglistByUser(@CurrentUser PrincipalDetails currentUser) {
        return takingLogService.selectTakingLogByUser(currentUser.getNickname());
    }

    @DeleteMapping("/supplements/uncheck")
    public void supplementsUncheck(@CurrentUser PrincipalDetails currentUser, @RequestBody HashMap<String, String> params) {
        takingLogService.deleteTakingLog(currentUser.getNickname(), params.get("supplementsName"));
    }
}
