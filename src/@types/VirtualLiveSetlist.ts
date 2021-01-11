export interface VirtualLiveSetlist {
  id: number
  virtualLiveId: number
  seq: number
  virtualLiveSetlistType: 'mc' | 'music'
  assetbundleName: string
  virtualLiveStageId: number
  musicId?: number
  musicVocalId?: number
  character3dId1?: number
  character3dId2?: number
  character3dId3?: number
  character3dId4?: number
  character3dId5?: number
}
