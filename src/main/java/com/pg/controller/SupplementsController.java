package com.pg.controller;

import com.pg.config.CurrentUser;
import com.pg.model.Supplements;
import com.pg.service.PrincipalDetails;
import com.pg.service.SupplementsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

// 영양제 관련 API — 대상 유저는 항상 로그인한 본인이다(클라이언트가 보낸 nickname은 신뢰하지 않음)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class SupplementsController {
    final private SupplementsService supplementsService;

    @PostMapping("/supplements/add")
    public Supplements addSupplements(@CurrentUser PrincipalDetails currentUser, @RequestBody HashMap<String, String> params) {
        String supplementsName = params.get("supplementsName");
        int quantity = Integer.parseInt(params.get("quantity"));
        int singleDose = Integer.parseInt(params.get("singleDose"));
        String slot = params.get("slot");
        return supplementsService.addSupplements(supplementsName, quantity, singleDose, slot, currentUser.getNickname());
    }

    @GetMapping("/supplements/list")
    public List<Supplements> findUserSupplements(@CurrentUser PrincipalDetails currentUser) {
        return supplementsService.findAllByUser(currentUser.getNickname());
    }

    @GetMapping("/supplements/delete")
    public void deleteSupplements(@CurrentUser PrincipalDetails currentUser, @RequestParam Long id) {
        supplementsService.deleteById(id, currentUser.getId());
    }
}
