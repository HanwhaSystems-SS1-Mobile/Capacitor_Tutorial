export default class PMCheckModel {
    mneoSermgrGroupServerAliveverLite: string
    mgServerAlive: string
    storeServerAlive: string
    hublistVersion: string
    companyInfo: [Info]
}

class Info {
    companyID: string
    pmYN: string
    redirectURL: string
    message: string
}