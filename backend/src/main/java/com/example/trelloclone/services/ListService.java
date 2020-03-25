package com.example.trelloclone.services;

import com.example.trelloclone.dao.ListRepository;
import com.example.trelloclone.entities.ListEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ListService {
  @Autowired private ListRepository listRepository;

  public ListEntity saveList(ListEntity listEntity) {
    return listRepository.saveAndFlush(listEntity);
  }

  public Iterable<ListEntity> getAllLists() {
    return listRepository.findAll();
  }

  public void deleteListById(Long id) {
    Integer index = listRepository.getOne(id).getIndex();
    listRepository.deleteById(id);
    for(ListEntity list : listRepository.findAll()) {
      if(list.getIndex() > index) {
        list.setIndex(list.getIndex() - 1);
        listRepository.saveAndFlush(list);
      }
    }
  }

  public void swapIndexes(Integer index1, Integer index2) {
    ListEntity list1 = listRepository.findByIndex(index1);
    ListEntity list2 = listRepository.findByIndex(index2);
    list1.setIndex(index2);
    list2.setIndex(index1);
    listRepository.saveAndFlush(list1);
    listRepository.saveAndFlush(list2);
  }
}
