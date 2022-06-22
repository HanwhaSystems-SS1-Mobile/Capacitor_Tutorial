import { ReplaySubject } from 'rxjs';
import MainService from '../service/HomeService';
import PMCheckModel from '@/model/PMCheckModel';

export default class HomeViewModel {
    service = new MainService()

    // Observable
    obUserGroupInfo = new ReplaySubject<PMCheckModel>()
    
    /**
     * @date 2022-06-08
     * @author 이승인
     * @description 유저정보 호출
     */
    async requestPmCheck() {
        this.service.fetch(await this.service.requestPmCheck(), this.obUserGroupInfo)
    }
}