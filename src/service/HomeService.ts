import { Observable } from 'rxjs';
import CommonService from "../common/CommonService"
import UserGroupInfo from "../model/PMCheckModel"

export default class HomeService extends CommonService {

    /**
     * @date 2022-09-10
     * @author 이승인
     * @description 그룹정보 확인
     * @param userId 계정
     * @returns Observable<UserGroupInfo>
     */
    requestPmCheck(): Observable<UserGroupInfo> {   
        return super.get("mgr_group_service_check.json")
    }
    
}
