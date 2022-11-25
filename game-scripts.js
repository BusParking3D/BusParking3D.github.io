var meta=document.querySelector("meta[name=viewport]");meta.setAttribute("content","width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover");var Preloader=pc.createScript("preloader"),tasksLoader=["Bus02","Bus03","Bus04","Bus05","Bus06","Bus07","Bus08","Bus09","Props","ObsCars","LowObs","Env02","Env03","Env04","Env05","Env06"],counterLoader=0,BusesLoaded=!1,PropsLoaded=!1,ObsLoaded=!1,OtherEnvLoaded=!1,AllAssetsLoaded=!1;Preloader.prototype.initialize=function(){this.currentLoadingAsset="none",0===counterLoader&&(this.loadAssets(tasksLoader[counterLoader]),counterLoader+=1)},Preloader.prototype.loadAssets=function(e){var s=this;this.currentLoadingAsset=e;for(var o=this.app.assets.findByTag(e),t=0,d=o.length,a=function(){(t+=1)===d&&s.onAssetsLoaded()},r=0;r<o.length;r++)o[r].resource?a():(o[r].once("load",a),this.app.assets.load(o[r]));o.length||this.onAssetsLoaded()},Preloader.prototype.onAssetsLoaded=function(){counterLoader<tasksLoader.length?(this.CheckOnLoaded(),this.loadAssets(tasksLoader[counterLoader]),counterLoader+=1):(AllAssetsLoaded=!0,this.CheckOnLoaded(),CANDEBUG&&console.log("all assets loaded"))},Preloader.prototype.CheckOnLoaded=function(){"Bus09"===this.currentLoadingAsset&&(BusesLoaded=!0),"Props"===this.currentLoadingAsset&&(PropsLoaded=!0),"LowObs"===this.currentLoadingAsset&&(ObsLoaded=!0),"Env06"===this.currentLoadingAsset&&(OtherEnvLoaded=!0)};var FamobiApi=pc.createScript("famobiApi");FamobiApi.attributes.add("IsBranding",{type:"boolean"}),FamobiApi.attributes.add("BrandingButton",{type:"entity"}),FamobiApi.attributes.add("GameManager",{type:"entity"});var MainFamobiApp,FamobiSelf,useAPI=!0,CANDEBUG=!0,canShowAds=!0,startTimer=!1,GameID="bus-parking-3d",PreferredUID=null,ClientVersion=1,EnableLog=!0,TrackAds=!0;FamobiApi.prototype.initialize=function(){startTimer=!0,this.GameManager||(this.GameManager=this.app.root.findByName("GameManager")),FamobiSelf=this,MainFamobiApp=this.app,!0===useAPI&&!0===this.IsBranding&&(this.setupBranding(),this.Initialize_famobi_tracking(GameID,PreferredUID,ClientVersion,EnableLog,TrackAds),this.on("enable",this.onEnableFamobi,this))},FamobiApi.prototype.onEnableFamobi=function(){!0===useAPI&&!0===this.IsBranding&&(this.setupBranding(),this.Initialize_famobi_tracking(GameID,PreferredUID,ClientVersion,EnableLog,TrackAds))},FamobiApi.prototype.Initialize_famobi_tracking=function(e,t,a,o,i){famobi_tracking.init(e,t,a,o,i)},FamobiApi.prototype.Register_famobi_tracking=function(e,t,a,o,i,n){e&&famobi_tracking.trackEvent(famobi_tracking.EVENTS.LEVEL_START,{level:t}),a&&famobi_tracking.trackEvent(famobi_tracking.EVENTS.LEVEL_UPDATE,{score:o}),i&&famobi_tracking.trackEvent(famobi_tracking.EVENTS.LEVEL_END,{success:n})},FamobiApi.prototype.setupBranding=function(){var e=/iPad|iPhone|iPod/.test(navigator.platform)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1;pc.platform.android||pc.platform.ios||pc.platform.mobile||e?this.BrandingButton.element.on("touchend",this.OnBrandingButtonClicked,this):this.BrandingButton.element.on("mouseup",this.OnBrandingButtonClicked,this),this.getBrandingFromFamobi(this.BrandingButton.element)},FamobiApi.prototype.OnBrandingButtonClicked=function(){window.famobi.openBrandingLink()},FamobiApi.prototype.getBrandingFromFamobi=function(e){var t=window.famobi.getBrandingButtonImage();this.app.loader.getHandler("texture").crossOrigin="anonymous";var a=new pc.Asset("myTexture","texture",{url:t});this.app.assets.add(a),a.on("error",function(e){console.error(e)}),a.on("load",function(t){e.texture=t.resource,e.width=150,e.height=63.15}),this.app.assets.load(a)},FamobiApi.prototype.getFamobiLocalStorage=function(e,t){return t?JSON.parse(window.famobi.localStorage.getItem(e)):window.famobi.localStorage.getItem(e)},FamobiApi.prototype.setFamobiLocalStorage=function(e,t,a){a?window.famobi.localStorage.setItem(e,JSON.stringify(t)):window.famobi.localStorage.setItem(e,t)},FamobiApi.prototype.RegisterFamobiEvents=function(e,t,a,o,i,n,l,r,m,s,c,d,p,g,u){e&&window.famobi_analytics.trackEvent("EVENT_LEVELSTART",{levelName:t}).then(function(){CANDEBUG&&console.log("----Level "+t+" started successfully")}),a&&window.famobi_analytics.trackEvent("EVENT_LEVELRESTART",{levelName:t}).then(function(){CANDEBUG&&console.log("----Level "+t+" restarted successfully")}),o&&(canShowAds?this.ShowAdsFamobi(o,i,n,t):window.famobi_analytics.trackEvent("EVENT_LEVELSUCCESS",{levelName:t}).then(function(){CANDEBUG&&console.log("----Level "+t+" completed successfully")})),i&&(canShowAds?this.ShowAdsFamobi(o,i,n,t):window.famobi_analytics.trackEvent("EVENT_LEVELFAIL",{levelName:t,reason:n}).then(function(){CANDEBUG&&console.log("----Level "+t+" failed because of "+n)})),l&&window.famobi_analytics.trackEvent("EVENT_LEVELSCORE",{levelName:t,levelScore:r}).then(function(){CANDEBUG&&console.log("----Level "+t+" score updated to "+r)}),m&&window.famobi_analytics.trackEvent("EVENT_LEVELSCORE",{totalScore:s}).then(function(){CANDEBUG&&console.log("----Total score updated to "+s)}),c&&window.famobi_analytics.trackEvent("EVENT_PAUSE").then(function(){CANDEBUG&&console.log("----Game Paused")}),d&&window.famobi_analytics.trackEvent("EVENT_RESUME").then(function(){CANDEBUG&&console.log("----Game Resumed")}),p&&window.famobi_analytics.trackEvent("EVENT_VOLUMECHANGE",{bgmVolume:g,sfxVolume:u}).then(function(){CANDEBUG&&console.log("----Backkground music value updated to "+g+" and sound value updated to "+u)})},FamobiApi.prototype.ShowAdsFamobi=function(e,t,a,o){e&&setTimeout(function(){Promise.all([window.famobi_analytics.trackEvent("EVENT_LEVELSUCCESS",{levelName:o}),window.famobi.showInterstitialAd()]).then(function(){CANDEBUG&&console.log("Ad showed successfully");var e=MainFamobiApp.root.findByTag("_Blocker");e[0]?(e[0].enabled=!1,FamobiSelf.GameManager||(FamobiSelf.GameManager=FamobiSelf.app.root.findByName("GameManager")),FamobiSelf.GameManager.script.gameManager.NextBtnGlow()):CANDEBUG&&console.log("not found")})}.bind(this),2e3),t&&setTimeout(function(){Promise.all([window.famobi_analytics.trackEvent("EVENT_LEVELFAIL",{levelName:o,reason:a}),window.famobi.showInterstitialAd()]).then(function(){CANDEBUG&&console.log("Ad showed successfully");var e=MainFamobiApp.root.findByTag("_Blocker");e[0]?e[0].enabled=!1:CANDEBUG&&console.log("not found")})}.bind(this),2e3)},useAPI&&(window.famobi_onPauseRequested=function(){CANDEBUG&&console.log("Pause"),MainFamobiApp.timeScale=0},window.famobi_onResumeRequested=function(){CANDEBUG&&console.log("Unpause"),MainFamobiApp.timeScale=1}),useAPI&&window.famobi.onOrientationChange(function(){"landscape"===window.famobi.getOrientation()?CANDEBUG&&console.log("Landscape"):"portrait"===window.famobi.getOrientation()&&CANDEBUG&&console.log("Portrait")}),FamobiApi.prototype.FamobiTrackableStats=function(e,t){window.famobi_analytics.trackStats(e,t),CANDEBUG&&console.log("-----Trackable Stats pushed :"+e+" with value : "+t)};var callTimeOut=!0,delayForPlayingStats=5e3,total_time_game_played_ever=0;FamobiApi.prototype.update=function(e){startTimer&&this.calculateTimePlayed(e)},FamobiApi.prototype.calculateTimePlayed=function(e){!1===useAPI?(total_time_game_played_ever=parseFloat(localStorage.getItem("temp_time"))||0,total_time_game_played_ever+=e,localStorage.setItem("temp_time",total_time_game_played_ever),localStorage.setItem("total_time_game_played",total_time_game_played_ever.toFixed(1))):(total_time_game_played_ever=parseFloat(window.famobi.localStorage.getItem("temp_time"))||0,total_time_game_played_ever+=e,window.famobi.localStorage.setItem("temp_time",total_time_game_played_ever),window.famobi.localStorage.setItem("total_time_game_played",total_time_game_played_ever.toFixed(1)),callTimeOut&&(callTimeOut=!1,this.app.root.findByTag("API")[0].script.famobiApi.FamobiTrackableStats("total_time_game_played",total_time_game_played_ever.toFixed(1)),setTimeout(function(){callTimeOut=!0},delayForPlayingStats)))};var SelfGameManager,CameraValStored,BusBody,CameraAngleValue,NextBtnGlowTimeout,GameManager=pc.createScript("gameManager"),isPause=!1,isDead=!1,isNotFirstTime=!1,startAnimating=!1,spawnPos=new pc.Vec3,yrotpos=1,isComeFromPause=!1,isTutorialOn=!0,isTutorialBegan=!1,isGameOver=!1,isFirstCount=!0,isGameStart=!1,isFirstTimeGamePlay=!0,scenesId=[897548,897554,897552,897549,897547,897546,897555,897553,897551,897550],speedBarProgress=[1.77,2.04,2.05,1.7,1.85,1.32,1.44,1.33,1.22],isComingFromGamePlay=!1,firstTimeInGamePlay=!0,busStats=[0,0,0,0,0,0,0,0,0],isRightCalled=!1,isLeftCalled=!1,isBackCalled=!1,isBtnGlown=!1,ShowFinalScreenButtons=!1;GameManager.attributes.add("Levels",{type:"entity",array:!0}),GameManager.attributes.add("Bus",{type:"entity",array:!0}),GameManager.attributes.add("Environment",{type:"entity"}),GameManager.attributes.add("ReverseParkingText",{type:"entity"}),GameManager.attributes.add("EnvironmentNo",{type:"number"}),GameManager.attributes.add("MidEnvironmentPatch",{type:"entity"}),GameManager.attributes.add("SecondaryCamera",{type:"entity"}),GameManager.attributes.add("PrimaryCamera",{type:"entity"}),GameManager.attributes.add("TutorialManagerRef",{type:"entity"}),GameManager.attributes.add("LevelSelectionRef",{type:"entity"}),GameManager.attributes.add("SoundManagerRef",{type:"entity"}),GameManager.attributes.add("BackMusicRef",{type:"entity"}),GameManager.prototype.CheckReferences=function(){this.RestartScreen=this.app.root.findByName("Restartscreen"),this.LevelFailText=pc.app.root.findByName("FailText"),this.timeImage=pc.app.root.findByName("TimeImage"),this.timeBack=pc.app.root.findByName("TimeBack"),this.LowHealth=pc.app.root.findByName("LowHealth"),this.TimesUpTxt=pc.app.root.findByName("TimesUp"),this.pauseBtn=pc.app.root.findByName("PauseBtn"),this.pauseBtn.setLocalPosition(-246.26,-10.419,0),this.Speedbar=pc.app.root.findByName("SpeedBar"),this.Speedbar.setLocalPosition(-188.613,-49.399,0),this.LevelStar=pc.app.root.findByName("Level"),this.LevelStar.element.opacity=0,this.resumeBtn=pc.app.root.findByName("ResumeBtn"),this.nextLevelBtn=pc.app.root.findByName("nxtlevel"),this.form=pc.app.root.findByName("Form"),this.startingScreen=pc.app.root.findByName("StartingScreen"),this.startingTime=pc.app.root.findByName("StartingTime"),this.WinSign=pc.app.root.findByName("WinSign"),this.LevelNo=pc.app.root.findByName("LevelNo"),this.loader=pc.app.root.findByName("loader"),this.loaderBack=pc.app.root.findByName("loaderBack"),this.FadeOut=pc.app.root.findByName("FadeOut"),this.HealthText=pc.app.root.findByName("HealthValue"),this.blackImage=pc.app.root.findByName("blankImage").children[0],this.time=pc.app.root.findByName("time"),this.ActualHealth=pc.app.root.findByName("ActualHealth"),this.soundManager=this.app.root.findByName("AllSounds"),this.needle=this.app.root.findByName("needle"),this.CoinValue=pc.app.root.findByName("CoinValue"),this.RestartBtn=this.app.root.findByName("RestartLevelBtn"),this.HealthText=pc.app.root.findByName("HealthValue"),this.RestartButton=this.app.root.findByName("RestartButton"),this.RestartFailButton=this.app.root.findByName("RestartFailLevelBtn"),this.HomeWinBtn=this.app.root.findByName("HomeBtn"),this.HomeFailButton=this.app.root.findByName("HomeBtnFail"),this.musicUnMuteBtn=this.app.root.findByName("MusicUnMuteBtn"),this.musicMuteBtn=this.app.root.findByName("MusicMuteBtn"),this.soundUnMuteBtn=this.app.root.findByName("SoundUnMuteBtn"),this.soundMuteBtn=this.app.root.findByName("SoundMuteBtn")},GameManager.prototype.EnableSelectedBus=function(){this.EnableBus(busUsing)},GameManager.prototype.EnableBus=function(e){CANDEBUG&&console.log("busUsing is "+e);for(var t=0;t<9;t++)SelfGameManager.Bus[t].enabled=!1;SelfGameManager.Bus[e].enabled=!0},GameManager.prototype.SoundEssentials=function(){var e=this.getLocalStorageItem("Music",!1),t=this.getLocalStorageItem("Sound",!1);"0"===e?(this.musicUnMuteBtn.enabled=!0,this.musicMuteBtn.enabled=!1):(this.musicMuteBtn.enabled=!0,this.musicUnMuteBtn.enabled=!1),"0"===t?(this.soundUnMuteBtn.enabled=!0,this.soundMuteBtn.enabled=!1):(this.soundUnMuteBtn.enabled=!1,this.soundMuteBtn.enabled=!0),SelfGameManager.ToggleMusic(e),SelfGameManager.ToggleSound(t)},GameManager.prototype.setMainSceneVar=function(){this.busStoreVar=1},GameManager.prototype.ManagerEssentials=function(){SelfGameManager=this,this.EnableSelectedBus(),isDead=!1,isPause=!1,this.temp=0,this.CheckReferences(),isGameOver=!1,this.isStartTime=!1,this.startingTimer=3.5,this.isBlackScreen=!1,this.loadertimer=0,this.isTimesUp=!1,this.isUpdatePositionCalled=!1,this.isRestartBtnPressed=!1,this.busStoreVar=0,this.isNxtBtnPressed=!1,this.is3rdCountDown=!1,this.is2ndCountDown=!1,this.is1stCountDown=!1,this.isFadeOutCalled=!1,this.isFirstTimeInManager=!1;var e=this.app;if(SelfGameManager.SoundEssentials(),setTimeout(function(){e.fire("FadeOutScreen")},1),this.SoundManagerRef.sound.on("end",function(e,t){this.OnSoundEnd(e,t)},this),LevelNumber>0){var t=10*(SelfGameManager.EnvironmentNo-1);CANDEBUG&&console.log("LevelNumber"+LevelNumber),SelfGameManager.Levels[LevelNumber-t-1].enabled=!0}var a=/iPad|iPhone|iPod/.test(navigator.platform)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1;pc.platform.android||pc.platform.ios||pc.platform.mobile||a?(this.soundMuteBtn.element.on("touchend",this.OnMuteSoundBtn,this),this.soundUnMuteBtn.element.on("touchend",this.OnUnMuteSoundBtn,this),this.musicMuteBtn.element.on("touchend",this.OnMuteMusicBtn,this),this.musicUnMuteBtn.element.on("touchend",this.OnUnMuteMusicBtn,this),this.pauseBtn.element.on("touchend",this.OnPauseBtn,this),this.resumeBtn.element.on("touchend",this.OnResumeBtn,this),this.nextLevelBtn.element.on("touchend",this.OnnextLevelBtn,this),this.RestartBtn.element.on("touchend",this.OnRestartBtn,this),this.RestartButton.element.on("touchend",this.OnRestartBtn,this),this.RestartFailButton.element.on("touchend",this.OnRestartBtn,this)):(this.app.keyboard.on(pc.EVENT_KEYDOWN,this.AnyBtnPressed,this),this.soundMuteBtn.element.on("mouseup",this.OnMuteSoundBtn,this),this.soundUnMuteBtn.element.on("mouseup",this.OnUnMuteSoundBtn,this),this.musicMuteBtn.element.on("mouseup",this.OnMuteMusicBtn,this),this.musicUnMuteBtn.element.on("mouseup",this.OnUnMuteMusicBtn,this),this.pauseBtn.element.on("mouseup",this.OnPauseBtn,this),this.resumeBtn.element.on("mouseup",this.OnResumeBtn,this),this.nextLevelBtn.element.on("mouseup",this.OnnextLevelBtn,this),this.RestartBtn.element.on("mouseup",this.OnRestartBtn,this),this.RestartButton.element.on("mouseup",this.OnRestartBtn,this),this.RestartFailButton.element.on("mouseup",this.OnRestartBtn,this)),e.on("ChangeLevel",function(){SelfGameManager.LevelNo=pc.app.root.findByName("LevelNo"),SelfGameManager.LevelNo.element.text=LevelNumber},this),e.on("game: setMainSceneVar",this.setMainSceneVar.bind(this),this),e.on("OnTime",function(){SelfGameManager.timeImage.enabled=!0,SelfGameManager.timeBack.enabled=!0},this),e.on("UpdateTime",function(){SelfGameManager.CheckReferences(),SelfGameManager.timer=Seconds,SelfGameManager.minutes=Minutes},this),e.on("FadeOutScreen",function(){!1===SelfGameManager.isFadeOutCalled&&(SelfGameManager.isFadeOutCalled=!0,setTimeout(function(){SelfGameManager.isFadeOutCalled=!1},1e3),CANDEBUG&&console.log("FadeOutFunctionCalled"),SelfGameManager.blackImage.enabled=!0,SelfGameManager.loaderBack.enabled=!0,setTimeout(function(){SelfGameManager.CheckReferences(),CANDEBUG&&console.log("loader back"+SelfGameManager.loaderBack.enabled),SelfGameManager.isBlackScreen=!0,SelfGameManager.loaderBack.enabled=!1},1200))},this),e.on("UpdatePositon",function(){SelfGameManager.isUpdatePositionCalled||(SelfGameManager.isUpdatePositionCalled=!0,setTimeout(function(){SelfGameManager.isUpdatePositionCalled=!1},3e3),CANDEBUG&&console.log("updatePosition"))},this),e.on("UpdateHealth",function(e,t,a){var n=t;if(SelfGameManager.CheckReferences(),e.element){e.text=0===n?(0).toString():n;var i,o=10,s=a.toString().length;o=10;var r=t-a,l=e;i=setInterval(function(){l.element&&(l.element.text=n,n<=r&&(clearInterval(i),l.element.text=n),1==s||2==s?n--:(n=n--,n=Math.round(n)))},o),e.element.text=0===n?(0).toString():n}}),e.on("LevelLoad",function(){this.LoadLevelThings()},this),e.on("GameOver",function(){this.GameOver()},this)},GameManager.prototype.initialize=function(){SelfGameManager=this,this.levelParent=this.app.root.findByName("Level"),1!==this.EnvironmentNo&&this.levelParent.setLocalPosition(-154.146,-15.346,0),this.speedParent=this.app.root.findByName("speedText"),this.speedParent.setLocalPosition(-213.25,-40.21,0),this.ManagerEssentials(),this.on("enable",this.ManagerEssentials,this)},GameManager.prototype.AnyBtnPressed=function(){this.app.keyboard.isPressed(pc.KEY_ESCAPE)&&this.OnPauseBtn()},GameManager.prototype.TurnOffReverseText=function(){this.ReverseParkingText.enabled=!1},GameManager.prototype.updatingPosition=function(){CANDEBUG&&console.log("updatePositionFunctionCalled"),BusBody=busStats[busUsing],transformm=BusBody.getWorldTransform();for(var e=0;e<9;e++){if(0!==busStats[e]&&e!==busUsing)busStats[e].getWorldTransform().setOrigin(new Ammo.btVector3(100,10,100)),CANDEBUG&&console.log("in bus unsing transformm "+busStats[e]),console.log("ok")}var t=new pc.Quat;isTimerFinished=!1,isGameOver=!1,SelfGameManager.CheckReferences(),SelfGameManager.is2ndCountDown=!1,SelfGameManager.is3rdCountDown=!1,SelfGameManager.is1stCountDown=!1,BusBody.setLinearVelocity(new Ammo.btVector3(0,0,0)),BusBody.setAngularVelocity(new Ammo.btVector3(0,0,0)),SelfGameManager.startingTime.enabled=!1,t.setFromEulerAngles(0,yrotpos,0),transformm.setOrigin(new Ammo.btVector3(spawnPos.x,spawnPos.y,spawnPos.z)),transformm.setRotation(new Ammo.btQuaternion(t.x,t.y,t.z,t.w)),SelfGameManager.startingScreen.enabled=!0,SelfGameManager.ActualHealth=pc.app.root.findByName("ActualHealth"),SelfGameManager.ActualHealth.element.text=100..toString(),!1===isTutorialOn&&SelfGameManager.app.fire("ResetHealth"),SelfGameManager.startingTime.enabled=!0,SelfGameManager.startingTime.element.text="",!0===firstTimeInGamePlay?(firstTimeInGamePlay=!1,SelfGameManager.SettingCounter(2.35)):!0===SelfGameManager.isFirstTimeInManager?SelfGameManager.SettingCounter(1.3):(SelfGameManager.isFirstTimeInManager=!0,SelfGameManager.SettingCounter(1.7))},GameManager.prototype.SettingCounter=function(e){setTimeout(function(){SelfGameManager.isStartTime=!0,SelfGameManager.StartTimerSound(0,1)},1e3*e)},GameManager.prototype.updatingTime=function(){SelfGameManager.timer=Seconds,SelfGameManager.minutes=Minutes},GameManager.prototype.ChangingLevel=function(){SelfGameManager.LevelNo.element.text=LevelNumber},GameManager.prototype.ToggleEnvironmentPatch=function(e){SelfGameManager.MidEnvironmentPatch.enabled=e},GameManager.prototype.ToggleNextLevelBtn=function(e){SelfGameManager.nextLevelBtn.enabled=e},GameManager.prototype.OnSoundEnd=function(e,t){e.name},GameManager.prototype.UnlockNextLevel=function(){levelLocked[LevelNumber]=1,this.setLocalStorageItem("levelLocked",levelLocked,!0)},GameManager.prototype.getLocalStorageItem=function(e,t){return!1===useAPI?t?JSON.parse(localStorage.getItem(e)):localStorage.getItem(e):this.app.root.findByTag("API")[0].script.famobiApi.getFamobiLocalStorage(e,t)},GameManager.prototype.setLocalStorageItem=function(e,t,a){!1===useAPI?a?localStorage.setItem(e,JSON.stringify(t)):localStorage.setItem(e,t):this.app.root.findByTag("API")[0].script.famobiApi.setFamobiLocalStorage(e,t,a)},GameManager.prototype.UpdateCameraTransform=function(e){CameraValStored=e,startAnimating=!0,SelfGameManager.SecondaryCamera.setLocalPosition(e.getLocalPosition()),SelfGameManager.SecondaryCamera.setLocalEulerAngles(e.getLocalEulerAngles())},GameManager.prototype.DebugUpdateCameraTransform=function(e){CameraValStored=e,startAnimating=!1,SelfGameManager.SecondaryCamera.setLocalPosition(e.getLocalPosition()),SelfGameManager.SecondaryCamera.setLocalEulerAngles(e.getLocalEulerAngles())},GameManager.prototype.update=function(e){this.isBlackScreen&&(this.blackImage.element.opacity-=.005,this.blackImage.element.opacity<=0&&(this.isBlackScreen=!1,this.blackImage.enabled=!1,this.blackImage.element.opacity=1)),this.isStartTime&&this.updateStartingTime(e),isPause||isDead||this.updateTime(e)},GameManager.prototype.CameraAnimation=function(){if(startAnimating){startAnimating=!1;var e=SelfGameManager;e.SecondaryCamera.tween(e.SecondaryCamera.getLocalEulerAngles()).rotate(e.PrimaryCamera.getLocalEulerAngles(),1.5,pc.Linear).start().once("complete",function(){},e),e.SecondaryCamera.tween(e.SecondaryCamera.getLocalPosition()).to(e.PrimaryCamera.getLocalPosition(),1.5,pc.Linear).start().once("complete",function(){e.PrimaryCamera.camera.enabled=!0,e.SecondaryCamera.enabled=!1},e)}},GameManager.prototype.OnPauseBtn=function(e){if(!1!==isCountDownEnd){if(!0===isTutorialPlaying&&(this.app.timeScale=1,tweenSpeed=1),isPause=!0,SelfGameManager.ReverseParkingText.enabled&&(SelfGameManager.ReverseParkingText.enabled=!1),SelfGameManager.soundManager.sound.slot("Tick").play(),SelfGameManager.soundManager.sound.slot("EngineHighSound").stop(),SelfGameManager.soundManager.sound.slot("EngineRunning").stop(),this.form.enabled=!0,!0===useAPI)this.app.root.findByTag("API")[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!0,!1,!1,0,0);CANDEBUG&&console.log("Game Paused")}},GameManager.prototype.OnResumeBtn=function(e){(SelfGameManager.soundManager.sound.slot("Tick").play(),SelfGameManager.soundManager.sound.slot("EngineHighSound").play(),1===PD&&(SelfGameManager.ReverseParkingText.enabled=!0,CANDEBUG&&console.log("double occured")),this.form.enabled=!1,this.pauseBtn.enabled=!0,isPause=!1,!0===useAPI)&&this.app.root.findByTag("API")[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!1,!0,!1,0,0);CANDEBUG&&console.log("Game resumed")},GameManager.prototype.OnRestartBtn=function(e){if(!1===this.isRestartBtnPressed){this.isRestartBtnPressed=!0,setTimeout(function(){SelfGameManager.isRestartBtnPressed=!1},1e3),isTutorialPlaying&&(CANDEBUG&&console.log("isTutorialPlaying"),SelfGameManager.TutorialManagerRef.script.tutorialManager.CheckAnyTutorial()),1===this.busStoreVar&&previousBusUsing!==busUsing&&(this.EnableSelectedBus(),this.app.fire("camera: SetBusIndex")),isGameStart=!1,SelfGameManager.SecondaryCamera.enabled=!0,SelfGameManager.soundManager.sound.slot("Tick").play(),SelfGameManager.BackMusicRef.sound.slot("BackSound").stop(),SelfGameManager.soundManager.sound.slot("EngineIdle").stop(),SelfGameManager.soundManager.sound.slot("EngineHighSound").stop(),isGameOver=!1,this.blackImage.element.opacity=1,this.isBlackScreen=!1,SelfGameManager.ReverseParkingText.enabled=!1,this.app.fire("UpdateDesiredYaw"),this.app.fire("StopBus"),SelfGameManager.startingScreen.enabled=!0,LevelWinCollider.enabled=!1,isCountDownEnd=!1,setTimeout(function(){LevelWinCollider.enabled=!0},3e3),playerEntity.destroy();for(var t=0;t<AllCoins.children.length;t++)AllCoins.children[t].enabled=!0;CameraAngleValue=0,isDead=!0,this.app.fire("ResetHealth");var a=10*(this.EnvironmentNo-1);if(this.Levels[LevelNumber-a-1].enabled=!1,this.Levels[LevelNumber-a-1].enabled=!0,this.ActualHealth.element.text=100,this.LevelFailText.enabled=!1,this.RestartScreen.enabled=!1,this.app.fire("NewLevel"),this.timer=Seconds,this.minutes=Minutes,this.pauseBtn.enabled=!0,this.form.enabled=!1,clearInterval(coinIntervalManager),this.busStoreVar=0,isPause){if(!0===useAPI)this.app.root.findByTag("API")[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!1,!0,!1,0,0);CANDEBUG&&console.log("Game resumed")}if(isPause=!1,!0===useAPI)this.app.root.findByTag("API")[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!0,!1,!1,"none",!1,0,!1,0,!1,!1,!1,0,0);CANDEBUG&&console.log("restarted level to be loaded: "+LevelNumber)}},GameManager.prototype.LoadEnvironment=function(e,t){var a=e,n=this.app.root.findByName("Root"),i=a+".json";LevelNumber=t,setTimeout(function(){n.destroy(),SelfGameManager.app.loadSceneHierarchy(i,function(e,t){e&&console.error(e)})},1e3)},GameManager.prototype.NextBtnGlow=function(e){isTutorialOn&&1===LevelNumber&&!0===isUpTutorialDone&&!1===isBtnGlown&&(NextBtnGlowTimeout=setTimeout(function(){isBtnGlown=!0,SelfGameManager.TutorialManagerRef.script.tutorialManager.highlightNextBtn()},500))},GameManager.prototype.ToggleMusic=function(e){this.BackMusicRef.sound.volume=e},GameManager.prototype.ToggleSound=function(e){this.soundManager.sound.volume=e},GameManager.prototype.OnnextLevelBtn=function(e){if(clearTimeout(NextBtnGlowTimeout),!1===this.isNxtBtnPressed){this.isNxtBtnPressed=!0,setTimeout(function(){SelfGameManager.isNxtBtnPressed=!1},1e3),isTutorialOn&&!1===isUIBtnShown&&1===LevelNumber&&SelfGameManager.TutorialManagerRef.script.tutorialManager.UIBtnPressed(),CANDEBUG&&console.log("busstorevar "+this.busStoreVar),1===this.busStoreVar&&previousBusUsing!==busUsing&&(this.EnableSelectedBus(),this.app.fire("camera: SetBusIndex")),SelfGameManager.startingTimer=3.43,SelfGameManager.SecondaryCamera.enabled=!0,SelfGameManager.soundManager.sound.slot("Tick").play(),this.ReverseParkingText.enabled=!1,isGameOver=!1,10!=LevelNumber&&(SelfGameManager.startingScreen.enabled=!0),CameraAngleValue=0,this.app.fire("StopBus"),isCountDownEnd=!1;for(var t=0;t<AllCoins.children.length;t++)AllCoins.children[t].enabled=!0;var a=10*(this.EnvironmentNo-1);if(this.Levels[LevelNumber-a-1].enabled=!1,(LevelNumber-a)%10!=0?(this.Levels[LevelNumber-a].enabled=!0,this.app.fire("ChangeLevel"),this.app.fire("ResetHealth"),this.ActualHealth.element.text=100,this.app.fire("NewLevel"),this.RestartScreen.enabled=!1,this.timer=Seconds,this.minutes=Minutes,this.pauseBtn.enabled=!0,this.LevelFailText.enabled=!1):(LevelNumber-a)%10==0&&(SelfGameManager.startingScreen.enabled=!1,100==LevelNumber?this.LoadEnvironment(scenesId[9],1):(this.LoadEnvironment(scenesId[this.EnvironmentNo-1],10*this.EnvironmentNo+1),CANDEBUG&&console.log("scene to be loaded : "+scenesId[this.EnvironmentNo-1])),this.RestartScreen.enabled=!1,this.blackImage.enabled=!0,this.loaderBack.enabled=!0),this.busStoreVar=0,!0===useAPI){var n=this.app.root.findByTag("API");n[0].script.famobiApi.RegisterFamobiEvents(!0,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!1,!1,!1,0,0),n[0].script.famobiApi.Register_famobi_tracking(!0,LevelNumber,!1,0,!1,!1)}CANDEBUG&&console.log("next level to be loaded: "+LevelNumber)}},GameManager.prototype.ManipulateBlocker=function(e){var t=this.app.root.findByTag("_Blocker");t[0]?t[0].enabled=e:console.log("not found")},GameManager.prototype.updateTime=function(e){!1!==isCountDownEnd?!1===isDead&&(this.needle.rotateLocal(0,0,-150*e),isFirstCount=!0,this.timer-=e,this.temp=Math.round(this.timer),this.temp<10?this.time.element.text=this.minutes+":0"+this.temp:this.time.element.text=this.minutes+":"+this.temp,0===this.temp&&(0===this.minutes?(this.isTimesUp=!0,this.GameOver()):(this.minutes--,this.timer=59))):isFirstCount&&(isFirstCount=!1,this.timer-=e,this.temp=Math.round(this.timer),this.temp<10?this.time.element.text=this.minutes+":0"+this.temp:this.time.element.text=this.minutes+":"+this.temp)},GameManager.prototype.TutorialForBegineer=function(e){1===LevelNumber&&!0!==isUpTutorialDone&&setTimeout(function(){SelfGameManager.TutorialManagerRef.script.tutorialManager.upKey()},2e3)},GameManager.prototype.StartTimerSound=function(e,t){SelfGameManager.soundManager.sound.slot("StartTimer").stop(),SelfGameManager.soundManager.sound.slot("StartTimer").startTime=e,SelfGameManager.soundManager.sound.slot("StartTimer").duration=t,SelfGameManager.soundManager.sound.slot("StartTimer").play()},GameManager.prototype.updateStartingTime=function(e){this.startingTimer-=e,this.temp=Math.round(this.startingTimer),4===this.temp&&(this.temp=3),3===this.temp&&!1===SelfGameManager.is3rdCountDown&&(SelfGameManager.is3rdCountDown=!0,SelfGameManager.PrimaryCamera.camera.enabled=!1),this.startingTime=pc.app.root.findByName("StartingTime"),this.startingTime.element.text=this.temp.toString(),2===this.temp&&!1===SelfGameManager.is2ndCountDown&&(SelfGameManager.is2ndCountDown=!0,SelfGameManager.StartTimerSound(0,1)),1===this.temp&&!1===SelfGameManager.is1stCountDown&&(SelfGameManager.is1stCountDown=!0,SelfGameManager.StartTimerSound(0,1)),0===this.temp&&(SelfGameManager.CameraAnimation(),!0===isFirstTimeGamePlay&&this.TutorialForBegineer(),SelfGameManager.StartTimerSound(3,5),SelfGameManager.BackMusicRef.sound.slot("BackSound").play(),setTimeout(function(){SelfGameManager.soundManager.sound.slot("EngineStart").play()},700),isPause=!1,isGameStart=!0,isTimerFinished=!0,SelfGameManager.SetRestartBtn(!0,!1,!0,!1),isNotFirstTime=!0,this.isStartTime=!1,this.startingTimer=3.47,this.app.timeScale=1,1!==this.EnvironmentNo&&(isTutorialOn=!1),this.startingScreen.enabled=!1,setTimeout(function(){SelfGameManager.soundManager.sound.slot("EngineIdle").play(),isCountDownEnd=!0,1==PD?SelfGameManager.ReverseParkingText.enabled=!0:SelfGameManager.ReverseParkingText.enabled=!1},1300))},GameManager.prototype.SetSoundsOnLose=function(){SelfGameManager.BackMusicRef.sound.slot("BackSound").stop(),SelfGameManager.soundManager.sound.slot("EngineIdle").stop(),SelfGameManager.soundManager.sound.slot("EngineRunning").stop(),SelfGameManager.soundManager.sound.slot("EngineHighSound").stop(),SelfGameManager.soundManager.sound.slot("LevelFailed").play()},GameManager.prototype.SetRestartBtn=function(e,t,a,n){SelfGameManager.RestartBtn.enabled=e,SelfGameManager.RestartFailButton.enabled=t,SelfGameManager.HomeWinBtn.enabled=a,SelfGameManager.HomeFailButton.enabled=n},GameManager.prototype.GameOver=function(e,t,a){if(!0!==isGameOver){if(isGameStart=!1,SelfGameManager.ManipulateBlocker(!0),SelfGameManager.CheckReferences(),SelfGameManager.SetSoundsOnLose(),SelfGameManager.HealthText=pc.app.root.findByName("HealthValue"),SelfGameManager.CoinValue=pc.app.root.findByName("CoinValue"),SelfGameManager.IterateCoins(parseInt(SelfGameManager.CoinValue.element.text)),SelfGameManager.ActualHealth=pc.app.root.findByName("ActualHealth"),previousBusUsing=busUsing,SelfGameManager.HealthText.element.text=SelfGameManager.ActualHealth.element.text,SelfGameManager.nextLevelBtn.enabled=!1,SelfGameManager.ReverseParkingText.enabled=!1,SelfGameManager.SetRestartBtn(!1,!0,!1,!0),SelfGameManager.RestartScreen.enabled=!0,!1===useAPI&&SelfGameManager.ManipulateBlocker(!1),!0===SelfGameManager.isTimesUp){if(SelfGameManager.TimesUpTxt.enabled=!0,SelfGameManager.LowHealth.enabled=!1,!0===useAPI){var n=this.app.root.findByTag("API");n[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!0,"timeout",!1,0,!1,0,!1,!1,!1,0,0),n[0].script.famobiApi.Register_famobi_tracking(!1,LevelNumber,!1,0,!0,!1)}CANDEBUG&&console.log("Game lose due to time over")}else{if(SelfGameManager.TimesUpTxt.enabled=!1,SelfGameManager.LowHealth.enabled=!0,!0===useAPI){var i=this.app.root.findByTag("API");i[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!0,"dead",!1,0,!1,0,!1,!1,!1,0,0),i[0].script.famobiApi.Register_famobi_tracking(!1,LevelNumber,!1,0,!0,!1)}CANDEBUG&&console.log("Game lose due to health zero")}SelfGameManager.LevelFailText.enabled=!0,SelfGameManager.form.enabled=!1,SelfGameManager.isTimesUp=!1,isDead=!0,isGameOver=!0}},GameManager.prototype.LoadLevelThings=function(){};var coinIntervalManager,isCoinIntervalManager=!1,condition2=!1;GameManager.prototype.IterateCoins=function(e){if(0!==e){var t=0;if(this.CoinValue.element){this.CoinValue.element.text=t,this.UseTweenScaleCoins(this.CoinValue,this.CoinValue,new pc.Vec3(1.6,1.6,1.6),.35,pc.SineOut);var a=50,n=e.toString().length;isCoinIntervalManager=!0,a=1==n||2==n?50:10;var i=e,o=this;coinIntervalManager=setInterval(function(){!0===isCoinIntervalManager&&o.CoinValue.element&&(o.CoinValue.element.text=t,t>=i&&(condition2=!0,clearInterval(coinIntervalManager),o.CoinValue.element.text=e),1==n||2==n?t++:(t+=e/200,t=Math.round(t)))},a),o.CoinValue.element.text=e}}},GameManager.prototype.OnMuteMusicBtn=function(){(this.setLocalStorageItem("Music",0,!1),this.SoundEssentials(),!0===useAPI)&&this.app.root.findByTag("API")[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!1,!1,!0,parseFloat(this.getLocalStorageItem("Music",!1)),parseFloat(this.getLocalStorageItem("Sound",!1)));CANDEBUG&&console.log("Music Tweaked "+this.getLocalStorageItem("Music",!1))},GameManager.prototype.OnMuteSoundBtn=function(){(this.setLocalStorageItem("Sound",0,!1),this.SoundEssentials(),!0===useAPI)&&this.app.root.findByTag("API")[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!1,!1,!0,parseFloat(this.getLocalStorageItem("Music",!1)),parseFloat(this.getLocalStorageItem("Sound",!1)));CANDEBUG&&console.log("Sound Tweaked "+this.getLocalStorageItem("Sound",!1))},GameManager.prototype.OnUnMuteMusicBtn=function(){(this.setLocalStorageItem("Music",1,!1),this.SoundEssentials(),!0===useAPI)&&this.app.root.findByTag("API")[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!1,!1,!0,parseFloat(this.getLocalStorageItem("Music",!1)),parseFloat(this.getLocalStorageItem("Sound",!1)));CANDEBUG&&console.log("Music Tweaked "+this.getLocalStorageItem("Music",!1))},GameManager.prototype.OnUnMuteSoundBtn=function(){(this.setLocalStorageItem("Sound",1,!1),this.SoundEssentials(),!0===useAPI)&&this.app.root.findByTag("API")[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!1,!1,!0,parseFloat(this.getLocalStorageItem("Music",!1)),parseFloat(this.getLocalStorageItem("Sound",!1)));CANDEBUG&&console.log("Sound Tweaked "+this.getLocalStorageItem("Sound",!1))},GameManager.prototype.UseTweenScaleCoins=function(e,t,a,n,i){e.tween(t.getLocalScale()).to(a,n,i).start().on("complete",function(){var a=e.tween(t.getLocalScale()).to(new pc.Vec3(1.9,1.9,1.9),.1,pc.SineOut).loop(!0).yoyo(!0).start().on("loop",function(){!0===condition2&&(a.stop(),condition2=!1,e.tween(t.getLocalScale()).to(new pc.Vec3(1,1,1),n,i).start())})},this)};var Camera=pc.createScript("camera");Camera.attributes.add("maxDistance",{type:"number",default:17,title:"Max Distance"}),Camera.attributes.add("minElevation",{type:"number",default:5,title:"Min Elevation"}),Camera.attributes.add("maxElevation",{type:"number",default:75,title:"Max Elevation"}),Camera.attributes.add("turningFactor",{type:"number",default:.07,title:"Turning Factor"}),Camera.attributes.add("desiredDistance",{type:"number",default:17,title:"desired Distance"}),Camera.attributes.add("desiredPitch",{type:"number",default:24,title:"desired Pitch"}),Camera.attributes.add("vehicle",{type:"entity",array:!0});var CameraSelf,oneTimeAngle=!0,isLandscape=!1,isMobile=!1,turnCameraLeft=!0,turnCameraRight=!0,isInitializeCalled=!1;function readDeviceOrientation(){!1!==isInitializeCalled&&(CameraSelf.checkRotation(CameraSelf.app),90===Math.abs(window.orientation)?!0===isMobile&&(CameraSelf.maxDistance=17,oneTimeAngle=!0):!0===isMobile&&(CameraSelf.desiredDistance=20,CameraSelf.maxDistance=20,oneTimeAngle=!0))}window.onorientationchange=readDeviceOrientation,Camera.prototype.checkRotation=function(e){var t=/iPad|iPhone|iPod/.test(navigator.platform)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1;pc.platform.android||pc.platform.ios||pc.platform.mobile||t?(e.touch.on(pc.EVENT_TOUCHSTART,this.onTouchStart,this),e.touch.on(pc.EVENT_TOUCHMOVE,this.onTouchMove,this),isMobile=!0):(e.mouse.on("mousemove",this.onMouseMove,this),isMobile=!1)},Camera.prototype.getBusIndex=function(){this.busIndex=busUsing},Camera.prototype.setBusIndex=function(){this.busIndex=busUsing},Camera.prototype.initialize=function(){this.cameraTimer=.2,this.getBusIndex(),oneTimeAngle=!0,isLandscape=!1,isMobile=!1,CameraSelf=this,readDeviceOrientation(),this.desiredYaw=0;var e=this.app;this.desiredPos=new pc.Vec3,e.on("UpdateDesiredYaw",function(){CameraSelf.desiredYaw=0},this),e.on("camera: SetBusIndex",this.setBusIndex.bind(this),this),isInitializeCalled=!0,this.desiredYaw=0,this.pitch=new pc.Quat,this.yaw=new pc.Quat,this.quat=new pc.Quat,this.lastTouchPoint=new pc.Vec2,this.Checkbox=pc.app.root.findByName("Checkbox"),this.BackCam=pc.app.root.findByName("BackCam"),this.checkRotation(e),this.Form=pc.app.root.findByName("Form")},Camera.prototype.onTouchStart=function(e){var t=e.touches[0];t.y>70*window.innerHeight/100||this.lastTouchPoint.set(t.x,t.y)},Camera.prototype.onTouchMove=function(e){var t=e.touches[0];if(t.y>70*window.innerHeight/100);else{var i=t.x-this.lastTouchPoint.x,a=t.y-this.lastTouchPoint.y;this.MoveCamera(i,a),this.lastTouchPoint.set(t.x,t.y)}},Camera.prototype.postUpdate=function(e){if(!1===isDead){!1===turnCameraLeft?0===this.desiredYaw&&0===CameraAngleValue||this.desiredYaw>-1*CameraAngleValue&&(this.desiredYaw-=this.turningFactor):!1===turnCameraRight?0===this.desiredYaw&&0===CameraAngleValue||this.desiredYaw<CameraAngleValue&&(this.desiredYaw+=this.turningFactor):0!==this.desiredYaw?this.desiredYaw<0?(this.desiredYaw+=this.turningFactor,this.desiredYaw>=0&&(this.desiredYaw=0)):this.desiredYaw>0?(this.desiredYaw-=this.turningFactor,this.desiredYaw<=0&&(this.desiredYaw=0)):this.desiredYaw=0:this.desiredYaw=0;var t=this.vehicle[this.busIndex].getPosition(),i=this.vehicle[this.busIndex].forward;i.y=0,i.normalize(),this.pitch.setFromAxisAngle(this.entity.right,-this.desiredPitch),this.yaw.setFromAxisAngle(pc.Vec3.UP,this.desiredYaw),this.quat.mul2(this.pitch,this.yaw).transformVector(i,i),this.desiredPos.add2(t,i.scale(this.desiredDistance));var a=this.entity.getPosition();a.lerp(a,this.desiredPos,1),this.entity.setPosition(a),this.entity.lookAt(t),!0===oneTimeAngle&&(this.desiredDistance=pc.math.clamp(this.desiredDistance-1,.1,this.maxDistance),oneTimeAngle=!1)}},Camera.prototype.onMouseMove=function(e){},Camera.prototype.onMouseWheel=function(e){CANDEBUG&&console.log(e.wheel),this.desiredDistance=pc.math.clamp(this.desiredDistance-e.wheel,.1,this.maxDistance)},Camera.prototype.MoveCamera=function(e,t){};// vehicle.js
var Vehicle = pc.createScript('vehicle');
var playerEntity;
var isTimerFinished = true;
// Script Attributes
var racePedal = false;
var brakePedal = false;
var leftPedal = false;
var rightPedal = false;
var SpeedBeforeCollision = 0;
var isCollided = false;
var BeforeCollisionSpeed = 0;
var distanceFromCam = 24;
var queue = [];
var speedArray = [0,1];
var isPosChanged = false;
var transformm;
var ParkingDirection = -1;
var PD = -1;
var SlidingGateRef;
var isCountDownEnd = false;
var vehicleManager;
var BusPosition= new pc.Vec3();
var IsLerpCamera = false;
var GameWins=false;
var busBodyInfo = {
    busBody: null,
    busTransform: null
};
Vehicle.attributes.add('CarMass', {type:'number', default: 1000,
                                   title: 'Car Mass'
                                  }); 

// top vehicle speed
Vehicle.attributes.add('topSpeed', {type:'number', default: 10,
                                    title: 'Top Speed'
                                   }); 

// used to accelerate the vehicle
Vehicle.attributes.add('maxEngineForce', {type:'number', default: 1000,
                                          title: 'Max Engine Force'
                                         }); 

// used for braking
Vehicle.attributes.add('maxBrakingForce', {type:'number', default: 30,
                                           title: 'Max Braking Force'
                                          }); 

// used for steering
Vehicle.attributes.add('maxSteering', {type:'number', default: 0.2,
                                       title: 'Max Steering'
                                      }); 

// Wheel parameters
Vehicle.attributes.add('suspensionStiffness', {type:'number', default: 20,
                                               title: 'Suspension Stiffness'
                                              });

Vehicle.attributes.add('suspensionDamping', {type:'number', default: 2.3,
                                             title: 'Suspension Damping'
                                            });

Vehicle.attributes.add('suspensionCompression', {type:'number', default: 4.4,
                                                 title: 'Suspension Compression'
                                                });

Vehicle.attributes.add('suspensionRestLength', {type:'number', default: 0.6,
                                                title: 'Suspension Rest Length'
                                               });

Vehicle.attributes.add('rollInfluence', {type:'number', default: 2,
                                         title: 'Roll Influence'
                                        });

Vehicle.attributes.add('friction', {type:'number', default: 1000,
                                    title: 'Friction Slip'
                                   });


Vehicle.attributes.add('WheelFrictionFactor', {type:'number', default: 5,
                                               title: 'Wheel Friction Factor'
                                              });

Vehicle.attributes.add('ChassisName', {type:'string',
                                      });


Vehicle.attributes.add('WheelFL', {type:'string',
                                  });

Vehicle.attributes.add('WheelFR', {type:'string',
                                  });

Vehicle.attributes.add('WheelBL', {type:'string',
                                  });

Vehicle.attributes.add('WheelBR', {type:'string',
                                  });

Vehicle.attributes.add('RightLight', {type:'entity',
                                     });
Vehicle.attributes.add('LeftLight', {type:'entity',
                                    });
Vehicle.attributes.add('BusNumber', {type:'number', default: 1,
                                    });

Vehicle.attributes.add('BusSkins',{type:'asset',assetType:'material',array:true});
Vehicle.attributes.add('BusModels', {type:'asset',assetType:'model',array:true});
Vehicle.attributes.add('BusTireMaterials',{type:'asset',assetType:'material',array:true});
Vehicle.attributes.add('collider', {type:'entity',
                                   });
Vehicle.attributes.add('ModelReference', {type:'entity',
                                         });

Vehicle.attributes.add('OriginRaycast', {type:'entity',
                                        });
Vehicle.attributes.add('BarFillingFactor', {type:'number', default: 1,
                                           });

Vehicle.attributes.add('needleTurnAngle', {type:'number', default: 90,
                                          });

// Vehicle.attributes.add('xpos', {type:'number',
//                                });
// Vehicle.attributes.add('ypos', {type:'number',
//                                });

// Vehicle.attributes.add('zpos', {type:'number',
//                                });





// Creates a rigid body ands adds it to the physics world
Vehicle.prototype.localCreateRigidBody = function(mass, transform, shape) {
    var localInertia = new Ammo.btVector3(0, 0, 0);
    if (mass > 0) {
        shape.calculateLocalInertia(mass, localInertia);
    }
    var motionState = new Ammo.btDefaultMotionState(transform); //The btDefaultMotionState provides a common implementation to synchronize world transforms with offsets
    var bodyInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia); //The btRigidBodyConstructionInfo structure provides information to create a rigid body.
    var body = new Ammo.btRigidBody(bodyInfo); // The btRigidBody is the main class for rigid body objects
    body.setContactProcessingThreshold(10000.0); //https://pybullet.org/Bullet/phpBB3/viewtopic.php?t=6575
    this.app.systems.rigidbody.dynamicsWorld.addRigidBody(body); // Add rigidbody to the world

    return body;
};

// Script Declaration
Vehicle.prototype.create = function() { // Configuration specific for the model of buggy.

    //this.app.systems.rigidbody.dynamicsWorld;
    this.ammoVec = new Ammo.btVector3(); // New keyword is important

    this.ReduceSpeed = new Ammo.btVector3(); // New keyword is important

    // set to true to see debug shapes for the vehicle
    this.DEBUG_DRAW = false;
    this.isSpeedZero = false;
    this.isCollidingWin = false;

    this.wheelDirection = new Ammo.btVector3(0, -1, 0);
    this.wheelAxle = new Ammo.btVector3(-1, 0, 0);
    // this.RestartScreen = this.app.root.findByName('Restartscreen');
    if(this.BusNumber === 2){


        this.wheelsConfig = 
            [{
                isFront: true,
                connection: [0.66, 0.8, 1.2],
                radius: 0.4,
                width: 0.4,
                name: "FR" // FRONT RIGHT WHEEL
            },                   
             {
                 isFront: true,
                 connection: [-0.66, 0.8, 1.2],
                 radius: 0.4,
                 width: 0.4,
                 name: "FL" // FRONT LEFT WHEEL
             },
             {
                 isFront: false,
                 connection: [-0.66, 0.8,-2.5], //-1.2],
                 radius: 0.4,
                 width: 0.4,
                 name:"BL"// BACK LEFT WHEEL
             },
             {
                 isFront: false,
                 connection: [0.66, 0.8,-2.5], //-1.2],
                 radius: 0.4,
                 width: 0.4,
                 name: "BR" // BACK RIGHT WHEEL
             },
             {
                 isFront: false,
                 connection: [-0.66,0.8,-2.5], // [-0.66, 0.8, -1.2],
                 radius: 0.4,
                 width: 0.4,
                 name:"BBL"// BACK LEFT WHEEL
             },
             {
                 isFront: false,
                 connection: [0.66,0.8, -2.5], //[0.66, 0.8, -1.2],
                 radius: 0.4,
                 width: 0.4,
                 name: "BBR" // BACK RIGHT WHEEL
             },
            ];
    }
    else if(this.BusNumber === 4){
        this.wheelsConfig = 
            [{
                isFront: true,
                connection: [0.92, 0.8, 1.35],
                radius: 0.47,
                width: 0.47,
                name: "FR" // FRONT RIGHT WHEEL
            },                   
             {
                 isFront: true,
                 connection: [-0.92, 0.8, 1.35],
                 radius: 0.47,
                 width: 0.47,
                 name: "FL" // FRONT LEFT WHEEL
             },
             {
                 isFront: false,
                 connection: [-0.92, 0.8,-3.1], //-1.2],
                 radius: 0.45,
                 width: 0.45,
                 name:"BL"// BACK LEFT WHEEL
             },
             {
                 isFront: false,
                 connection: [0.92, 0.8,-3.1], //-1.2],
                 radius: 0.45,
                 width: 0.45,
                 name: "BR" // BACK RIGHT WHEEL
             },
             {
                 isFront: false,
                 connection: [-0.92,0.8,-3.1], // [-0.66, 0.8, -1.2],
                 radius: 0.45,
                 width: 0.45,
                 name:"BBL"// BACK LEFT WHEEL
             },
             {
                 isFront: false,
                 connection: [0.92,0.8, -3.1], //[0.66, 0.8, -1.2],
                 radius: 0.45,
                 width: 0.45,
                 name: "BBR" // BACK RIGHT WHEEL
             },
            ];
    }
    else if(this.BusNumber === 6){


        this.wheelsConfig = 
            [{
                isFront: true,
                connection: [0.77, 0.8, 1.35],
                radius: 0.47,
                width: 0.47,
                name: "FR" // FRONT RIGHT WHEEL
            },                   
             {
                 isFront: true,
                 connection: [-0.77, 0.8, 1.35],
                 radius: 0.47,
                 width: 0.47,
                 name: "FL" // FRONT LEFT WHEEL
             },
             {
                 isFront: false,
                 connection: [-0.77, 0.8,-3.2], //-1.2],
                 radius: 0.45,
                 width: 0.45,
                 name:"BL"// BACK LEFT WHEEL
             },
             {
                 isFront: false,
                 connection: [0.77, 0.8,-3.2], //-1.2],
                 radius: 0.45,
                 width: 0.45,
                 name: "BR" // BACK RIGHT WHEEL
             },
             {
                 isFront: false,
                 connection: [-0.77,0.8,-3.2], // [-0.66, 0.8, -1.2],
                 radius: 0.45,
                 width: 0.45,
                 name:"BBL"// BACK LEFT WHEEL
             },
             {
                 isFront: false,
                 connection: [0.77,0.8, -3.2], //[0.66, 0.8, -1.2],
                 radius: 0.45,
                 width: 0.45,
                 name: "BBR" // BACK RIGHT WHEEL
             },
            ];
    }

    else if (this.BusNumber === 5){
        this.wheelsConfig = 
            [{
                isFront: true,
                connection: [0.77, 0.8, 1.36],
                radius: 0.5,
                width: 0.5,
                name: "FR" // FRONT RIGHT WHEEL
            },                   
             {
                 isFront: true,
                 connection: [-0.77, 0.8, 1.36],
                 radius: 0.5,
                 width: 0.5,
                 name: "FL" // FRONT LEFT WHEEL
             },
             {
                 isFront: false,
                 connection: [-0.77, 0.8, -1.4],
                 radius: 0.5,
                 width: 0.5,
                 name:"BL"// BACK LEFT WHEEL
             },
             {
                 isFront: false,
                 connection: [0.77, 0.8, -1.4],
                 radius: 0.5,
                 width: 0.5,
                 name: "BR" // BACK RIGHT WHEEL
             },
            ];
    }

    else{
        this.wheelsConfig = 
            [{
                isFront: true,
                connection: [0.66, 0.8, 1.2],
                radius: 0.4,
                width: 0.4,
                name: "FR" // FRONT RIGHT WHEEL
            },                   
             {
                 isFront: true,
                 connection: [-0.66, 0.8, 1.2],
                 radius: 0.4,
                 width: 0.4,
                 name: "FL" // FRONT LEFT WHEEL
             },
             {
                 isFront: false,
                 connection: [-0.66, 0.8, -1.2],
                 radius: 0.4,
                 width: 0.4,
                 name:"BL"// BACK LEFT WHEEL
             },
             {
                 isFront: false,
                 connection: [0.66, 0.8, -1.2],
                 radius: 0.4,
                 width: 0.4,
                 name: "BR" // BACK RIGHT WHEEL
             },
            ];
    }
};


var _rollInfluence=0;

var accelerator;
var braker;
var TutorialManagerGlobal;
Vehicle.prototype.initialize = function () {
    vehicleManager =this;
    //this.on("enable",this.VehicleEssentials,this);
    this.VehicleEssentials();
};
Vehicle.prototype.destroyVehicleEssentials = function () {
    this.carChassis.setActivationState(2);
    this.app.systems.rigidbody.dynamicsWorld.removeRigidBody(this.carChassis);
    //this.app.systems.rigidbody.dynamicsWorld.removeAction(this.vehicle);
    this.app.systems.rigidbody.dynamicsWorld.removeVehicle(this.vehicle);

    playerEntity.destroy();
    // Ammo.destroy(playerEntity);
};

Vehicle.prototype.VehicleEssentials = function () {
    this.eulers = new pc.Vec3();
    this.ModelReference.model.meshInstances[0].material=this.BusSkins[busUsing].resource; //busUsing
    isPosChanged=false;
    isCollided = false;

    racePedal = false;
    brakePedal = false;
    leftPedal = false;
    rightPedal = false;

    this.isCameraPos= true;
    this.isGrass = false;
    this.isCoinCalled = false;

    this.isEngineDeaccelerate = false;
    this.oldspd = 0;

    //UI related things
    this.LevelSuccessText = pc.app.root.findByName("SuccessText");
    this.HealthText = pc.app.root.findByName("HealthValue");
    this.CoinValue = pc.app.root.findByName("CoinValue");
    this.CoinValue.element.text = (0).toString();


    this.Health1 = pc.app.root.findByName("Health1");
    this.Health2 = pc.app.root.findByName("Health2");
    this.Health3 = pc.app.root.findByName("Health3");

    this.SteeringSlider = pc.app.root.findByName("SteeringSlider");
    this.TopSpeedSlider = pc.app.root.findByName("TopSpeedSlider");
    this.EnginePowerSlider = pc.app.root.findByName("EnginePowerSlider");
    this.BrakingPowerSlider = pc.app.root.findByName("BrakingPowerSlider");
    this.RollInfluenceSlider = pc.app.root.findByName("RollInfluenceSlider");
    this.EngineForceDecrementSlider = pc.app.root.findByName("EngineForceDecrementSlider");
    this.RestartScreen = this.app.root.findByName('Restartscreen');
    this.healthZero = this.app.root.findByName('health0');
    this.soundManager = this.app.root.findByName('AllSounds');
    this.GameManager = this.app.root.findByName('GameManager');
    this.RParticleEffect = this.app.root.findByName("RParticleEffect");
    this.LParticleEffect = this.app.root.findByName("LParticleEffect");
    this.isEngineRun = false;
    this.isEngineHigh = false;
    this.isRightDone = false;
    this.isLeftDone = false;
    this.isBackDone = false;
    this.speedValue = this.app.root.findByName("SpeedValue");
    this.HealthBarValue = this.app.root.findByName("HealthBarValue");
    this.speedNeedle=this.app.root.findByName("needleSpeed");

    this.SetHealthValue(100);
    //}

    if(this.BusNumber === 2){
        this.raycastReverse = this.app.root.findByName('raycastReverse');
    }



    //this.WinPlane = pc.app.root.findByName("WinPlane");
    // this.WinRightStrip = pc.app.root.findByName("WinRightStrip");
    // this.WinLeftStrip = pc.app.root.findByName("WinLeftStrip");
    //this.LeftLight = pc.app.root.findByName("LeftLight");
    //this.RightLight = pc.app.root.findByName("RightLight");
    this.totalCoin = 0;
    this.ActualCoin = pc.app.root.findByName("ActualCoins");
    this.CoinObject = pc.app.root.findByName("Coinpicture");
    this.collisionCount = 0;
    this.speedArrayLen = 0;
    this.checkBox = pc.app.root.findByName("Checkbox");
    this.form = pc.app.root.findByName("Form");
    //this.entity.collision.on('collisionstart', this.onCollisionStart, this);
    //this.entity.collision.on('contact', this.onContact, this);

    this.ActualSpeed = pc.app.root.findByName("ActualSpeed");
    this.ActualHealth = pc.app.root.findByName("ActualHealth");
    this.RemainingHealth = 100;
    //  this.SlidingGateRef = this.ActualSpeed;

    var RacePedalBtn = this.app.root.findByName("Race_Pedal");
    var BrakePedalBtn = this.app.root.findByName("Brake_Pedal");

    if(isTutorialOn)
    {
        var TutorialManagerLocal = this.app.root.findByName("TutorialManager");
        TutorialManagerGlobal=TutorialManagerLocal;
    }

    accelerator=RacePedalBtn;
    braker=BrakePedalBtn;

    var LeftBtn = this.app.root.findByName("Left");
    var RightBtn = this.app.root.findByName("Right");
    var RightsideBtn = this.app.root.findByName("Rightside");

    this.RightBackLight = this.app.root.findByName("RightBackLight");
    this.LeftBackLight = this.app.root.findByName("LeftBackLight");
    this.RightGlow = this.app.root.findByName("RightGlow");
    this.LeftGlow = this.app.root.findByName("LeftGlow");

    this.camera =  this.app.root.findByName("Camera");

    this.UpdateBtn =  this.app.root.findByName("UpdateBtn");
    this.Form = pc.app.root.findByName("Form");
    this.EngineForceDecreaseFactor = 16;



    var isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Setup UI Events for mobile
    if(pc.platform.android || pc.platform.ios || pc.platform.mobile || isIOS){
        RacePedalBtn.element.on('touchstart', this._Racing, this);
        BrakePedalBtn.element.on('touchstart', this._Braking, this);

        RacePedalBtn.element.on('touchend', this._RacingEnd, this);
        BrakePedalBtn.element.on('touchend', this._BrakingEnd, this);

        LeftBtn.element.on('touchstart', this._LeftSteer, this);
        RightBtn.element.on('touchstart', this._RightSteer, this);

        LeftBtn.element.on('touchend', this._LeftSteerEnd, this);
        RightBtn.element.on('touchend', this._RightSteerEnd, this);
        this.UpdateBtn.element.on('touchend', this.AttributeChangeFromUI, this);
        //this.LParticleEffect.particlesystem.sort = pc.PARTICLESORT_DISTANCE;
        //this.RParticleEffect.particlesystem.sort = pc.PARTICLESORT_DISTANCE;
        //RightsideBtn.enabled = true;

    }
    else{
        this.UpdateBtn.element.on('mouseup', this.AttributeChangeFromUI, this);
        RacePedalBtn.enabled = false;
        BrakePedalBtn.enabled = false;
        LeftBtn.enabled = false;
        RightBtn.enabled = false;

    }

    var app = this.app;

    this.create();

    this.engineForce = 0.0;
    this.brakingForce = 0.0;

    this.vehicleSteering = 0.0;

    this.debug = {
        chassis: null,
        wheels: []
    };

    this.graphics = {
        chassis: null,
        wheels: []
    };

    this.trans = new Ammo.btTransform();
    this.quat = new pc.Quat();
    this.pos = new pc.Vec3();
    this.mat = new pc.Mat4();

    this.initialRot = this.entity.getRotation().clone();
    this.initialPos = this.entity.getPosition().clone();
    this.direction = new pc.Vec3();

    this.controls = false;

    var i;
    var chassisShape;
    // Create box for chassis
    if(this.BusNumber ===6)
        chassisShape = new Ammo.btBoxShape(new Ammo.btVector3(1.05, 0.8, 5.2));//(1.2, 0.8, 4.9)
    else  if(this.BusNumber ===5)
        chassisShape = new Ammo.btBoxShape(new Ammo.btVector3(1.15, 0.8, 4.77));
    else  if(this.BusNumber ===4)
        chassisShape = new Ammo.btBoxShape(new Ammo.btVector3(1.15, 0.8, 4.7));//(1, 0.8, 4.5))
    else  if(this.BusNumber ===7)
        chassisShape = new Ammo.btBoxShape(new Ammo.btVector3(1.05, 0.8, 4.7));
    else  if(this.BusNumber ===8)
        chassisShape = new Ammo.btBoxShape(new Ammo.btVector3(1.09, 0.8, 4.4));
    else  if(this.BusNumber ===9)
        chassisShape = new Ammo.btBoxShape(new Ammo.btVector3(1.1, 0.8, 4.5));
    else if(this.BusNumber ===1)
        chassisShape = new Ammo.btBoxShape(new Ammo.btVector3(1.02, 0.8, 4));//1.1
    else if(this.BusNumber === 3)
        chassisShape = new Ammo.btBoxShape(new Ammo.btVector3(1.15, 0.8, 4.22));
    else
        chassisShape = new Ammo.btBoxShape(new Ammo.btVector3(1.15, 0.8, 4.2));

    // Create compound shape that will contain the chassis shape.
    // We use a compound shape to shift the center of mass with respect to the chassis
    // localTrans effectively shifts the center of mass
    var localTrans = new Ammo.btTransform();
    localTrans.setIdentity();
    localTrans.setOrigin(new Ammo.btVector3(0, 1, 0));

    var compound = new Ammo.btCompoundShape();
    compound.addChildShape(localTrans, chassisShape);

    // create rigid body for the chassis and position it 
    // at the location of this entity
    var tr = new Ammo.btTransform();
    tr.setIdentity();

    var p = this.entity.getPosition();
    tr.setOrigin(new Ammo.btVector3(p.x, p.y, p.z)); 
    this.carChassis = this.localCreateRigidBody(this.CarMass, tr, compound);
    this.carChassis.entity = this.entity;

    // Create vehicle
    var tuning = new Ammo.btVehicleTuning(); //https://pybullet.org/Bullet/phpBB3/viewtopic.php?t=3346
    var vehicleRayCaster = new Ammo.btDefaultVehicleRaycaster(app.systems.rigidbody.dynamicsWorld);
    this.vehicle = new Ammo.btRaycastVehicle(tuning, this.carChassis, vehicleRayCaster);

    // Never deactivate the vehicle
    this.carChassis.setActivationState(pc.RIGIDBODY_DISABLE_DEACTIVATION);
    // Add the vehicle to the dynamics world
    app.systems.rigidbody.dynamicsWorld.addAction(this.vehicle);

    // Choose coordinate system
    var rightIndex = 0; 
    var upIndex = 1; 
    var forwardIndex = 2;
    this.vehicle.setCoordinateSystem(rightIndex, upIndex, forwardIndex);

    // Add wheels to the vehicle
    var name = this.entity.getName();
    var numWheels = this.wheelsConfig.length;

    var wheel;
    for (i = 0; i < numWheels; i++) {
        wheel = this.wheelsConfig[i];
        var connectionPoint = new Ammo.btVector3(wheel.connection[0], wheel.connection[1], wheel.connection[2]);
        this.vehicle.addWheel(connectionPoint, this.wheelDirection, this.wheelAxle, this.suspensionRestLength, wheel.radius, tuning, wheel.isFront);
    }

    // Set wheel params
    // "Total Wheels" + this.vehicle.getNumWheels();
    for (i = 0; i < this.vehicle.getNumWheels(); i++) {
        wheel = this.vehicle.getWheelInfo(i);
        wheel.set_m_suspensionStiffness(this.suspensionStiffness);
        wheel.set_m_wheelsDampingRelaxation(this.suspensionDamping);
        wheel.set_m_wheelsDampingCompression(this.suspensionCompression);
        wheel.set_m_frictionSlip(this.friction);
        wheel.m_brake = this.WheelFrictionFactor;
        wheel.set_m_rollInfluence(this.rollInfluence);
    }
    var FR,FL,BL,BR,BBR,BBL;
    // Find the actual chassis and wheel models 

    this.graphics.chassis = this.entity.findByName(this.ChassisName);
    if(this.BusNumber === 3){
        FR = this.app.root.findByName("FR3");
        FL = this.app.root.findByName("FL3");
        BL = this.app.root.findByName("BL3");
        BR = this.app.root.findByName("BR3");
    }
    else if(this.BusNumber === 1){
        FR = this.app.root.findByName("FR1");
        FL = this.app.root.findByName("FL1");
        BL = this.app.root.findByName("BL1");
        BR = this.app.root.findByName("BR1");
    }
    else if(this.BusNumber === 2){
        FR = this.app.root.findByName("FR22");
        FL = this.app.root.findByName("FL22");
        BL = this.app.root.findByName("BL22");
        BR = this.app.root.findByName("BR22");
        BBR = this.app.root.findByName("BBR2");
        BBL = this.app.root.findByName("BBL2");

    }
    else if(this.BusNumber === 5){
        FR = this.app.root.findByName("FR5");
        FL = this.app.root.findByName("FL5");
        BL = this.app.root.findByName("BL5");
        BR = this.app.root.findByName("BR5");
    }
    else if(this.BusNumber === 6){
        FR = this.app.root.findByName("FR6");
        FL = this.app.root.findByName("FL6");
        BL = this.app.root.findByName("BL6");
        BR = this.app.root.findByName("BR6");
        BBR = this.app.root.findByName("BBR6");
        BBL = this.app.root.findByName("BBL6");

    }
    else if(this.BusNumber === 7){
        FR = this.app.root.findByName("FR7");
        FL = this.app.root.findByName("FL7");
        BL = this.app.root.findByName("BL7");
        BR = this.app.root.findByName("BR7");

    }
    else if(this.BusNumber === 8){
        FR = this.app.root.findByName("FR8");
        FL = this.app.root.findByName("FL8");
        BL = this.app.root.findByName("BL8");
        BR = this.app.root.findByName("BR8");

    }
    else if(this.BusNumber === 9){
        FR = this.app.root.findByName("FR9");
        FL = this.app.root.findByName("FL9");
        BL = this.app.root.findByName("BL9");
        BR = this.app.root.findByName("BR9");

    }
    else{
        FR = this.app.root.findByName("FR4");
        FL = this.app.root.findByName("FL4");
        BL = this.app.root.findByName("BL4");
        BR = this.app.root.findByName("BR4");
        BBR = this.app.root.findByName("BBR4");
        BBL = this.app.root.findByName("BBL4");

    }



    // for (i = 0; i < this.vehicle.getNumWheels(); i++) {
    //     this.graphics.wheels[i] = this.entity.findByName(this.wheelsConfig[i].name);
    //     //this.entity.findByName(this.wheelsConfig[i].name);
    // }

    this.graphics.wheels[0] = FR;
    this.graphics.wheels[1] = FL;
    this.graphics.wheels[2] = BL;
    this.graphics.wheels[3] = BR;
    if(this.BusNumber === 2|| this.BusNumber ===4 ||this.BusNumber ===6){
        this.graphics.wheels[4] = BBL;
        this.graphics.wheels[5] = BBR;
    }


    this.e = new pc.Entity();
    // Create the debug graphics for the car
    if (this.DEBUG_DRAW) {

        this.e.setLocalScale(2, 1.6, 8.4);

        app.root.addChild(this.e);
        this.e.addComponent('model', {
            type: 'box',
            castShadows: true
        });

        this.debug.chassis = this.e;

        for (i = 0; i < this.vehicle.getNumWheels(); i++) {
            //if(i !=2 && i !=3){
            wheel = this.wheelsConfig[i];

            p = new pc.Entity();
            app.root.addChild(p);
            this.debug.wheels.push(p);

            this.e = new pc.Entity();
            this.e.setLocalEulerAngles(0, 0, 90);
            this.e.setLocalScale(wheel.radius / 0.5, wheel.width, wheel.radius / 0.5);
            p.addChild(this.e);
            this.e.addComponent('model', {
                type: 'cylinder',
                castShadows: true
            });
            ////}
        }
    }
    playerEntity = this.e;

    this.collider.collision.on('triggerenter', this.onTriggerEnter, this);
    this.collider.collision.on('triggerleave', this.onTriggerLeave, this);

    // Set up the events
    var self = this;
    this.on("enable", this.onEnable);

    this.on("disable", this.onDisable);

    this.on("attr", this.onAttributeChanged);

    this.onEnable();

    this.OriginalEngineForce = this.maxEngineForce;
    app.fire('LevelLoad');
    var body = this.carChassis;
    var transform = body.getWorldTransform();
    transform.setOrigin(new Ammo.btVector3(this.initialPos.x, this.initialPos.y, this.initialPos.z));
    transform.setRotation(new Ammo.btQuaternion(this.initialRot.x, this.initialRot.y, this.initialRot.z, this.initialRot.w));
    app.on('vehicle: destroyEssentials',this.destroyVehicleEssentials.bind(this),this);
    app.on('NewLevel', function () {

        this.OnNewLevel();
    }, this);
    app.on('StopBus', function () {

        this.engineForce = 0;
    }, this);
    app.on('ResetHealth', function () {
        this.SetHealthValue(100);
    }, this);
    app.on('ResetHealthManually', function (index) {
        this.SetHealthValue(index);
    }, this);

    //     app.on('DisableClock', function () {


    //     }, this);


    var body = this.carChassis;
    transformm = body.getWorldTransform();

    BusBody = body;


    //     busBodyInfo.busBody = BusBody;
    //     busBodyInfo.busTransform = transformm;
    //     busStats[busUsing] = busBodyInfo;
    //     
    busStats[busUsing] = BusBody;





    // this.SetInitializeStorage();
};


// Resets the vehicle to its initial position
// Vehicle.prototype.reset = function () {
//     var body = this.carChassis;

//     var transform = body.getWorldTransform();
//     transform.setOrigin(new Ammo.btVector3(this.initialPos.x, this.initialPos.y, this.initialPos.z));
//     transform.setRotation(new Ammo.btQuaternion(this.initialRot.x, this.initialRot.y, this.initialRot.z, this.initialRot.w));
//     body.setLinearVelocity(new Ammo.btVector3(0, 0, 0));
//     body.setAngularVelocity(new Ammo.btVector3(0, 0, 0));
// };


// Called when the vehicle is enabled
Vehicle.prototype.onEnable = function () {
    this.controls = true;
};


// Called when the vehicle is disabled
Vehicle.prototype.onDisable = function () {
    this.controls = false;
};




Vehicle.prototype.onContact = function (result){
    //this.collisionCount++;
    //this.collisionCount;
};

// Called when an attribute changes value in the Designer
Vehicle.prototype.onAttributeChanged = function (name, oldValue, newValue) {

    if (this.vehicle) {
        // reset parameters on all wheels
        for (var i = 0; i < this.vehicle.getNumWheels(); i++) {
            var wheel = this.vehicle.getWheelInfo(i);
            wheel.set_m_suspensionStiffness(this.suspensionStiffness);
            wheel.set_m_wheelsDampingRelaxation(this.suspensionDamping);
            wheel.set_m_wheelsDampingCompression(this.suspensionCompression);
            wheel.set_m_frictionSlip(this.friction);
            wheel.set_m_rollInfluence(this.rollInfluence);
            wheel.m_brake = this.WheelFrictionFactor;
            this.vehicle.updateWheelTransform(i, false);
        }
    }
};
Vehicle.prototype.postUpdate = function (dt) {
    //nsole.log("postupdate");
    if(!isPause){


        if(!isCollided)
        {
            var spd = this.vehicle.getRigidBody().getLinearVelocity();
            var speedUI = spd.length().toFixed(1);
            postspeed = speedUI;       
        }
    }
};

var vehicleSpeed=0;

var deltaTime=0;
// Called every frame
Vehicle.prototype.update = function (dt) {

    deltaTime=dt;

    if(isPause)
    {
        // this.vehicle.applyEngineForce(-this.engineForce, 2);
        // this.vehicle.applyEngineForce(-this.engineForce, 3);
        // this.vehicle.setBrake(2000, 2);
        // this.vehicle.setBrake(2000, 3);
        var speedBeforeColliion = Math.max(...speedArray);

        if(speedBeforeColliion > 2){
            this.vehicle.getRigidBody().setLinearVelocity(0);
        }

        return;
    }
    if(isPosChanged === false)
    {
        var body = this.carChassis;
        transformm = body.getWorldTransform();
        // this.app.fire('UpdatePositon');
        isPosChanged = true;
    }
    //this.app.systems.rigidbody.dynamicsWorld.stepSimulation(dt,0);
    if(isDead === false){
        var app = this.app;
        var i;


        // Limit vehicle velocity
        var maxVehicleSpeed = this.topSpeed;




        var spd = this.vehicle.getRigidBody().getLinearVelocity();
        // if(isComeFromPause){
        //     isComeFromPause = false;
        //     spd = this.oldspd;
        // }
        // else{
        //     this.oldspd = spd;
        // }
        if (spd.length() > maxVehicleSpeed) {
            var divisor = Math.abs(spd.length() / maxVehicleSpeed);
            this.ammoVec.setValue(spd.x() / divisor, spd.y() / divisor, spd.z() / divisor);
            this.vehicle.getRigidBody().setLinearVelocity(this.ammoVec);
        }


        var speedUI = spd.length().toFixed(1);
        // if(isComeFromPause){
        //     isComeFromPause = false;
        //     var speedBeforeColliion = Math.max(...speedArray);
        //     speedUI = speedBeforeColliion;
        // }

        // var speedBeforeColliion = Math.max(...speedArray);

        vehicleSpeed=(speedUI/15);
        if(this.speedArrayLen != 29){
            speedArray[this.speedArrayLen] = speedUI;
            this.speedArrayLen++;
        }
        else if(this.speedArrayLen == 29){
            this.speedArrayLen = 0;
        }
        if(speedUI < 0.3){
            this.soundManager.sound.slot('EngineIdle').volume = 0.5;
            var scale = new pc.Vec3(0, 0, 0);
            vehicleManager.speedValue.setLocalScale(scale);  
        }
        else{
            this.soundManager.sound.slot('EngineIdle').volume = 0.2;
            var scales = new pc.Vec3(1, 1, 1);
            vehicleManager.speedValue.setLocalScale(scales);
            vehicleManager.SetSpeedValue(speedUI);
        }

        if(!vehicleManager.speedNeedle)
            vehicleManager.speedNeedle=vehicleManager.app.root.findByName("needleSpeed");
        //var temp12=this.topSpeed/this.BarFillingFactor;

        vehicleManager.moveNeedle((speedUI/this.topSpeed));


        queue.push(speedUI);         // queue is now [2]
        // queue is now [2, 5]
        var j = queue.shift(); // queue is now [5]

        if(!isCollided)
        {
            SpeedBeforeCollision = speedUI;        
        }
        if(isGameStart === true ){
            if(speedUI < 0.3){
                speedUI = 0;
                this.soundManager.sound.slot('EngineRunning').stop();
                // this.soundManager.sound.slot('EngineHighSound').stop();
                this.isEngineRun = false;
                // this.isEngineHigh = false;
                // this.soundManager.sound.slot('EngineStart').resume();
            }
            //             else if(speedUI > 9){
            //                 if(this.isEngineHigh === false){
            //                     this.soundManager.sound.slot('EngineHighSound').play();
            //                     this.soundManager.sound.slot('EngineRunning').stop();
            //                     this.isEngineHigh = true;
            //                     this.isEngineRun = false;
            //                 }
            //             }
            //             else{
            //                 this.soundManager.sound.slot('EngineStart').pause();
            //                 if(this.isEngineRun === false){
            //                     this.soundManager.sound.slot('EngineRunning').play();
            //                     this.isEngineRun = true;
            //                 }

            //             }
        }


        // if(speedUI < 6){
        // var soundManager = this.app.root.findByName('AllSounds');
        // this.soundManager.sound.slot('ObstacleSound').play();
        // this.soundManager.sound.slot('ObstacleSound').stop();
        //}


        CameraAngleValue = speedUI/1.5;
        if(speedUI===0)
            this.ActualSpeed.element.text = (0).toString();
        else{
            //if condition just make sure that speed Ui have 0 value during level start and restart level
            if(isTimerFinished === true){
                this.ActualSpeed.element.text = speedUI;
            }
            else{
                this.ActualSpeed.element.text = (0).toString();
            }
        }


        this.maxEngineForce =  Math.abs(this.OriginalEngineForce - this.EngineForceDecreaseFactor*parseFloat(speedUI));
        // console.log("maxEngineForce"+ this.OriginalEngineForce);



        if(spd.length() > 0.2){
            this.isSpeedZero = false;
        }
        else{
            this.isSpeedZero = true;
        }

        this.direction.set(spd.x(), spd.y(), spd.z()).normalize();

        // Get user input
        var left = false;
        var right = false;
        var up = false;
        var down = false;

        if(isCountDownEnd === true){
            if (this.controls) {
                left = app.keyboard.isPressed(pc.KEY_A) || app.keyboard.isPressed(pc.KEY_LEFT) || leftPedal;
                right = app.keyboard.isPressed(pc.KEY_D) || app.keyboard.isPressed(pc.KEY_RIGHT) || rightPedal;
                up = app.keyboard.isPressed(pc.KEY_W) || app.keyboard.isPressed(pc.KEY_UP) || racePedal;
                down = app.keyboard.isPressed(pc.KEY_S) || app.keyboard.isPressed(pc.KEY_DOWN) || brakePedal;
            }



            if (left && right) {
                this.vehicleSteering = 0;
                turnCameraLeft = true;
                turnCameraRight = true;
            } else if (left) {
                this.vehicleSteering = pc.math.lerp(this.vehicleSteering,this.maxSteering,0.02);
                //if(turnCamera === true){
                turnCameraLeft =false;
                turnCameraRight = true;




            } else if (right) { 
                this.vehicleSteering = pc.math.lerp(this.vehicleSteering,-this.maxSteering,0.02);
                turnCameraRight = false;
                turnCameraLeft = true;

            } else {
                //this.maxSteering = pc.math.lerp(this.maxSteering,0,0.1);
                //this.vehicleSteering = this.maxSteering;
                this.vehicleSteering = pc.math.lerp(this.vehicleSteering,0,0.05);
                turnCameraLeft = true;
                turnCameraRight = true;
            }

            if (up && down) {
                this.engineForce = this.brakingForce = 0;
            } else if (up) {
                this.brakingForce = 0;
                this.engineForce = this.maxEngineForce;

                //this.soundManager.sound.slot('DeaccelerateSound').stop();
                if(this.isEngineHigh === false){
                    this.soundManager.sound.slot('EngineHighSound').play();


                    this.isEngineHigh = true;
                    this.isEngineRun = false;
                }
                // else if(speedUI<2){
                //     this.soundManager.sound.slot('EngineHighSound').play();
                // }

                this.isEngineDeaccelerate  = false;
                this.soundManager.sound.slot('EngineIdle').volume = 0.2;
                if(speedUI < 3 && speedUI > 0) {

                    if(this.isEngineRun === false){
                        this.soundManager.sound.slot('EngineRunning').play();
                        this.isEngineRun = true;
                    }
                }
                else if(speedUI > 5){
                    //                     if(this.isEngineHigh === false){
                    //                         this.soundManager.sound.slot('EngineHighSound').play();


                    //                         this.isEngineHigh = true;
                    //                         this.isEngineRun = false;
                    //                     }
                }

            } else if (down) {
                this.brakingForce = 0;
                this.engineForce = -this.maxEngineForce;
                //                 if(this.isEngineDeaccelerate === false && speedUI>2) {
                //                     //this.soundManager.sound.slot('DeaccelerateSound').play();
                //                     this.isEngineDeaccelerate  = true;
                //                 }
                if(this.isEngineRun === false){
                    this.soundManager.sound.slot('EngineRunning').play();
                    this.isEngineRun = true;
                }
                // else{
                //     this.soundManager.sound.slot('EngineRunning').stop();
                //     this.isEngineRun = false;
                // }

                //                 this.soundManager.sound.slot('EngineHighSound').stop();

                //this.isEngineHigh = false;


                //this.RightBackLight.enabled = true;
                //this.LeftBackLight.enabled = true;
                //this.RightGlow.enabled = true;
                //this.LeftGlow.enabled = true;
            } else { 
                this.engineForce = 0;
                this.brakingForce =0;
                // if(this.isEngineDeaccelerate === false && speedUI>2) {
                //     this.soundManager.sound.slot('DeaccelerateSound').play();
                //     this.isEngineDeaccelerate  = true;
                // }
                this.soundManager.sound.slot('EngineRunning').stop();
                // this.soundManager.sound.slot('EngineHighSound').stop();
                this.isEngineRun = false;
                // this.isEngineHigh = false;


                //this.RightBackLight.enabled = false;
                //this.LeftBackLight.enabled = false;
                //this.RightGlow.enabled = false;
                //this.LeftGlow.enabled = false;
            }
            if(this.isEngineHigh === true){
                if(speedUI/10 < 0.8)
                {
                    // if(speedUI/10 < 0.2){
                    //     this.soundManager.sound.slot('EngineHighSound').pitch = 0.3;
                    // }
                    // else{
                    this.soundManager.sound.slot('EngineHighSound').pitch = speedUI/10 + 0.3; 
                    // }

                }

            }
            if(app.keyboard.isPressed(pc.KEY_B)){
                this.brakingForce = this.maxBrakingForce;
            }

        }


        // Apply engine and braking force to the back wheels

        this.vehicle.applyEngineForce(this.engineForce, 2);
        this.vehicle.setBrake(this.brakingForce, 2);
        this.vehicle.applyEngineForce(this.engineForce, 3);
        this.vehicle.setBrake(this.brakingForce, 3);
        //this.vehicle.updateFriction(dt);

        // Apply steering to the front wheels
        this.vehicle.setSteeringValue(this.vehicleSteering, 0);
        this.vehicle.setSteeringValue(this.vehicleSteering, 1);


        //this.vehicle.updateVehicle(dt);

        for (i = 0; i < this.vehicle.getNumWheels(); i++) {
            // synchronize the wheels with the (interpolated) chassis worldtransform
            this.vehicle.updateWheelTransform(i, true);
        }

        // Get world transform of the chassis from the physics engine
        this.carChassis.getMotionState().getWorldTransform(this.trans);
        //this.carChassis.getMotionState();
        var t = this.trans;

        var p = t.getOrigin();
        var q = t.getRotation();
        this.quat.set(q.x(), q.y(), q.z(), q.w());

        // position debug shapes
        if (this.DEBUG_DRAW) {
            this.debug.chassis.setPosition(p.x(), p.y() + 1, p.z());
            this.debug.chassis.setRotation(this.quat);
        }

        // position chassis model
        this.entity.setPosition(p.x(), p.y(), p.z());
        this.entity.setRotation(this.quat);
        this.graphics.chassis.setPosition(p.x(), p.y() , p.z());

        // get chassis world transform we will use it to correct
        // the wheel positions
        this.mat.copy(this.graphics.chassis.getWorldTransform());
        this.mat.invert();
        var loop = 4;
        if(this.BusNumber=== 2|| this.BusNumber === 4|| this.BusNumber ===6){
            loop = 6;
        }
        for (i = 0; i < loop; i++) {

            this.SetTirePosition(i);



            this.graphics.wheels[i].setLocalPosition(this.pos);
            this.graphics.wheels[i].setRotation(this.quat);


            // position wheel debug shapes

            if (this.DEBUG_DRAW) {
                this.debug.wheels[i].setPosition(p.x(), p.y(), p.z());
                this.debug.wheels[i].setRotation(this.quat);
            }

        }

        var color = new pc.Color(1, 1, 1);
        var length = 10.0;



        var start = this.OriginRaycast.getPosition();
        var end = new pc.Vec3();
        var ray = new pc.Vec3(this.entity.forward.x*PD,this.entity.forward.y,this.entity.forward.z* PD);
        // create a vector in the direction of the entity forward of length distance.
        ray.scale(length);
        // get end point as start + ray
        end.copy(start).add(ray);
        // Display raycast
        //
        // app.renderLine(start, end, color);

        var result = this.app.systems.rigidbody.raycastFirst(start, end);
        if(result){
            var distance = this.getDistance (this.entity.getPosition(), result.point) - 1;
            distanceAhead = distance;
            if(result.entity.name === "WinCollider"){

                if(CANDEBUG)
                    console.log(result.entity.name);

                if(this.isSpeedZero === true){
                    if(CANDEBUG)
                        console.log("distance" + distance);

                    if(distance > 1.8 && distance < 4.9){ //2.8
                        //var ans = new pc.Vec3().distance(this.LeftLight,this.WinLeftStrip);
                        // var temp = new pc.Vec3(5, 3, 2);
                        // var temp1 = new pc.Vec3(10, 7, 10);
                        var leftCheck = this.ComputeDistance(this.LeftLight, WinPoint);

                        if(CANDEBUG)
                            console.log("distance btw left " + leftCheck);

                        var rightCheck = this.ComputeDistance(this.RightLight, WinPoint);

                        if(CANDEBUG)
                            console.log("distance btw right " + rightCheck);

                        if(leftCheck < 2.35 && leftCheck > 1)
                        {
                            if(rightCheck < 2.2 /*2/*/ && rightCheck > 1)
                            {

                                this.Win();
                            }
                        }

                        //this.Win();
                    }
                }
            }
            if(isTutorialOn){

                if(result.entity.name === "RightKeyT"){
                    if(CANDEBUG)
                        console.log(result.entity.name);

                    // if(this.isRightDone)
                    // {
                    //     var rightTRef = pc.app.root.findByName("RightKeyT");
                    //     rightTRef.enabled = false;
                    // }

                    if(LevelNumber === 2 && isRightCalled === false){
                        if(CANDEBUG)
                            console.log("In right");

                        var rightT = pc.app.root.findByName("RightKeyT");
                        rightT.enabled = false;
                        //this.isRightDone = true;
                        TutorialManagerGlobal.script.tutorialManager.rightKey("");
                        isRightCalled = true;
                    }


                }
                if(result.entity.name === "LeftKeyT"){
                    // if(this.isLeftDone)
                    // {
                    //     var leftTRef = pc.app.root.findByName("LeftKeyT");
                    //     leftTRef.enabled = false;
                    // }

                    if(LevelNumber === 2 && isLeftCalled === false){
                        var leftT = pc.app.root.findByName("LeftKeyT");
                        leftT.enabled = false;

                        TutorialManagerGlobal.script.tutorialManager.leftKey("");

                        // this.isLeftDone = true; // commenting for testing
                        isLeftCalled = true;


                    }
                }

                if(result.entity.name === "BackT" ||result.entity.name === "BackT2"){

                    // if(isBackCalled)
                    // {
                    //     var backTRef = pc.app.root.findByName("BackT");
                    //     var backT2Ref = pc.app.root.findByName("BackT2");
                    //     backTRef.enabled = false;
                    //     backTRef.enabled = false; 
                    // }

                    if(LevelNumber === 4 &&  isBackCalled === false){
                        var backT = pc.app.root.findByName("BackT");
                        var backT2 = pc.app.root.findByName("BackT2");
                        backT.enabled = false;
                        backT2.enabled = false;
                        if(CANDEBUG)
                            console.log("in back");
                        TutorialManagerGlobal.script.tutorialManager.backKey("");
                        //this.isBackDone = true;
                        isBackCalled = true;


                    }
                }

            } 
        }

    }
};
Vehicle.prototype.SetTirePosition = function(i) {
    t = this.vehicle.getWheelTransformWS(i);

    p = t.getOrigin();
    q = t.getRotation();

    this.pos.set(p.x(), p.y(), p.z());

    this.quat.set(q.x(), q.y(), q.z(), q.w());

    // convert world position to local position
    this.mat.transformPoint(this.pos, this.pos);

    if(this.BusNumber === 1)
    {


        if(i === 0 || i === 1) // FRONT WHEELS
        {
            if(i ===0){
                this.pos.x *= 1.37;
                this.pos.z *= 1.85;
                //this.pos.y *= 1.2;
            }
            if(i ===1){
                this.pos.x *= 1.37;
                this.pos.z *= 1.85;
                //this.pos.y  *= 1.2;
            }

        }
        else if(i === 2 || i === 3) // BACK WHEELS
        {

            if(i === 2){
                this.pos.x *= 1.48;//1.4;
                this.pos.z *= 1.75;//1.8;
                this.pos.y  *= 1;
            }
            if(i === 3){
                this.pos.x *= 1.48;//1.4;
                this.pos.z *= 1.75;//1.8;
                this.pos.y  *= 1;
            }


        }
    }
    else if(this.BusNumber === 3){
        if(i === 0 || i === 1) // FRONT WHEELS
        {
            if(i ===0){
                this.pos.x *= 1.45;
                this.pos.z *= 2.1;
                this.pos.y *= 1.2;
            }
            if(i ===1){
                this.pos.x *= 1.45;
                this.pos.z *=2.1;
                this.pos.y  *= 1.2;
            }

        }
        else if(i === 2 || i === 3) // BACK WHEELS
        {

            if(i === 2){
                this.pos.x *= 1.45;//1.4
                this.pos.y  *= 1.2;
                this.pos.z *= 1.35;//1.8
            }
            if(i === 3){
                this.pos.x *= 1.45;
                this.pos.y  *= 1.2;
                this.pos.z *= 1.35;
            }


        }
    }
    else if(this.BusNumber === 2)
    {
        if(i === 0 || i === 1) // FRONT WHEELS
        {
            if(i ===0){
                this.pos.x *= 1.45;
                this.pos.z *= 2.19;
                this.pos.y *= 1.2;
            }
            if(i ===1){
                this.pos.x *= 1.45;
                this.pos.z *= 2.19;
                this.pos.y  *= 1.2;
            }

        }
        else if(i === 2 || i === 3) // BACK WHEELS
        {

            if(i === 2){
                this.pos.x *= 1.57;//1.4
                this.pos.z *= 0.51;//1.8
                this.pos.y *=1.1; 
            }
            if(i === 3){
                this.pos.x *= 1.57;
                this.pos.z *= 0.51;//0.5
                this.pos.y *=1.1;
            }


        }
        else if(i === 4 || i === 5){// Back back wheels
            if(i === 4)
            {
                this.pos.x *= 1.57;//this.xpos;//1.6;
                this.pos.z *= 0.97;
                this.pos.y *=0.93;
            }
            if(i === 5){
                this.pos.x *= 1.57;
                this.pos.z *= 0.97;
                this.pos.y *=0.93;
            }
        }
    }

    else if(this.BusNumber === 4)
    {
        if(i === 0 || i === 1) // FRONT WHEELS
        {
            if(i ===0){
                this.pos.x *= 1.2;//this.xpos;//1.15;//1.45
                this.pos.z *= 2.15;//this.ypos;//2.30;//2.19
                this.pos.y *= 1;//this.zpos;//0.8;//1.2
            }
            if(i ===1){
                this.pos.x *= 1.02;//this.xpos;//0.9;
                this.pos.z *= 2.15;//.ypos;//2.30;
                this.pos.y  *= 1;//this.zpos;//0.8;
            }

        }
        else if(i === 2 || i === 3) // BACK WHEELS
        {

            if(i === 2){
                this.pos.x *= 1.02;//this.xpos;///0.9;//1.4
                this.pos.y *= 1;//this.ypos;
                this.pos.z *= 0.39;//this.zpos;//0.33;//1.8
            }
            if(i === 3){
                this.pos.x *= 1.2;//this.xpos;//1.19;//1.4
                this.pos.z *= 0.39;//this.zpos;//0.32;//.5
            }


        }
        else if(i === 4 || i === 5){// Back back wheels
            if(i === 4)
            {
                this.pos.x *= 1.03;//this.xpos;//0.9;
                this.pos.z *= 0.81;//this.zpos;//0.78;
                this.pos.y *= 0.9;//this.ypos;//
            }
            if(i === 5){
                this.pos.x *= 1.19;
                this.pos.z *= 0.81;
                this.pos.y *=0.9;
            }
        }
    }
    else if(this.BusNumber === 5)
    {
        if(i === 0 || i === 1) // FRONT WHEELS
        {
            if(i ===0){
                this.pos.x *= -1;
                this.pos.z *= 2.95;
                this.pos.y *= 1.55;
            }
            if(i ===1){
                this.pos.x *= -1.3;
                this.pos.z *= 2.95;
                this.pos.y  *= 1.55;
            }

        }
        else if(i === 2 || i === 3) // BACK WHEELS
        {

            if(i === 2){
                this.pos.x *= -1.3;//this.xpos;//1.3;//this.xpos;//-1.06;//1.4
                this.pos.z *= 1.6;//this.zpos;//-1.6;//this.zpos;//1.65;
                this.pos.y *=1.55;
            }
            if(i === 3){
                this.pos.x *= -1.06;//1.19;//1.4
                this.pos.z *= 1.65;//0.32;//.5
                this.pos.y *=1.55;
            }


        }
    }
    else if(this.BusNumber === 6)
    {
        if(i === 0 || i === 1) // FRONT WHEELS
        {
            if(i ===0){//done
                this.pos.x *= 1.3;
                this.pos.z *= 2.55;
                this.pos.y *= 1;//1.2
            }
            if(i ===1){
                this.pos.x *= 1.28;
                this.pos.z *= 2.5;
                this.pos.y  *= 1;
            }

        }
        else if(i === 2 || i === 3) // BACK WHEELS
        {

            if(i === 2){
                this.pos.x *= 1.3;//;//1.4
                this.pos.z *= 0.55;//this.zpos;//1.8
            }
            if(i === 3){
                this.pos.x *= 1.3;//1.4
                this.pos.z *= 0.55;//.5
            }


        }
        else if(i === 4 || i === 5){// Back back wheels
            if(i === 4)
            {
                this.pos.x *= 1.35;//this.xpos;
                this.pos.z *= 0.92;//this.zpos;
            }
            if(i === 5){
                this.pos.x *=1.35;
                this.pos.z *= 0.92;
            }
        }
    }
    else if(this.BusNumber === 7)
    {
        if(i === 0 || i === 1) // FRONT WHEELS
        {
            if(i ===0){
                this.pos.x *= 1.5;//this.xpos;
                this.pos.z *= 3.2;//this.zpos;
                this.pos.y *= 1.15;
            }
            if(i ===1){
                this.pos.x *= 1.6;//this.xpos;
                this.pos.z *= 3.2;//this.zpos;
                this.pos.y  *= 1.15;
            }

        }
        else if(i === 2 || i === 3) // BACK WHEELS
        {

            if(i === 2){
                this.pos.x *= 1.6;//this.xpos;//1.5;////1.4
                this.pos.z *= 1.7;//this.zpos;
                this.pos.y  *= 1.15;
            }
            if(i === 3){
                this.pos.x *= 1.6;//this.xpos;//1.5;//1;//1.19;//1.4
                this.pos.z *= 1.7;//this.zpos;//1.35;//1;//0.32;//.5
                this.pos.y  *= 1.15;
            }

        }
    }
    else if(this.BusNumber === 8)
    {
        if(i === 0 || i === 1) // FRONT WHEELS
        {
            if(i ===0){
                this.pos.x *= 1.5;//this.xpos;
                this.pos.z *= 1.93;//this.zpos;
                this.pos.y *= 1.15;
            }
            if(i ===1){
                this.pos.x *= 1.61;//this.xpos;
                this.pos.z *= 1.93;//this.zpos;
                this.pos.y  *= 1.15;
            }

        }
        else if(i === 2 || i === 3) // BACK WHEELS
        {

            if(i === 2){
                this.pos.x *= 1.6;//this.xpos;//
                this.pos.z *= 1.35;//this.zpos;//
                this.pos.y  *= 1.06;
            }
            if(i === 3){
                this.pos.x *= 1.51;//this.xpos;//1;//1.19;//1.4
                this.pos.z *= 1.35;//this.zpos;//1;//0.32;//.5
                this.pos.y  *= 1.06;
            }


        }
    }
    else if(this.BusNumber === 9)
    {
        if(i === 0 || i === 1) // FRONT WHEELS
        {
            if(i ===0){
                this.pos.x *= 1.55;//this.xpos;
                this.pos.z *= 2.15;//this.zpos;
                this.pos.y *= 1.15;
            }
            if(i ===1){
                this.pos.x *=1.55;//////this.xpos;
                this.pos.z *= 2.17;//this.zpos;//this.zpos;
                this.pos.y  *= 1.15;
            }

        }
        else if(i === 2 || i === 3) // BACK WHEELS
        {

            if(i === 2){
                this.pos.x *= 1.55;//this.xpos;//this.xpos;
                this.pos.z *= 1.43;//this.zpos;
                this.pos.y  *= 1.15;
            }
            if(i === 3){
                this.pos.x *= 1.55;//this.xpos;//1;//1.19;//1.4
                this.pos.z *= 1.4;//this.zpos;//1;//0.32;//.5
                this.pos.y  *= 1.15;
            }


        }
    }

};
Vehicle.prototype.SetSpeedValue = function(spdUi) {
    var totalSpeed = this.topSpeed/speedBarProgress[busUsing];
    //console.log("filling factor"+ this.BarFillingFactor);
    var progress = (spdUi / totalSpeed);// * 100;
    if(progress < 50/100){
        vehicleManager.speedValue.element.color = new pc.Color(0,1,0);
    }
    else if (progress >85/100){
        vehicleManager.speedValue.element.color = new pc.Color
        (
            progress >= 50 ? 2 * 1: 1,//(100 - progress) / 100,
            progress <= 50 ? 2 * 0 : 0,0 //(progress) / 100,0
        );
    }
    else if(progress > 50/100){
        vehicleManager.speedValue.element.color = new pc.Color(1,0.65,0);
    }
    vehicleManager.speedValue.setLocalScale(progress, 1 ,1);// = progress;// * (190/100);


    //entity.setLocalScale(1, 2, 1);
};

var previousSpeed=0;
Vehicle.prototype.moveNeedle = function(newProg) {
    this.eulers = this.speedNeedle.getLocalEulerAngles();

    if(newProg>previousSpeed)
        this.eulers.z=pc.math.clamp(this.eulers.z- this.needleTurnAngle*deltaTime,-55,106.5);   
    else if(newProg<previousSpeed)
        this.eulers.z=pc.math.clamp(this.eulers.z+this.needleTurnAngle*deltaTime,-55,106.5);  

    if(newProg<0.05)
        this.eulers.z=106.5;

    var limit=0;
    vehicleManager.speedNeedle.setEulerAngles(this.eulers);
    previousSpeed=newProg;

};

Vehicle.prototype.SetHealthValue = function(healthVal) {
    var progress = (healthVal / 100) * 100;
    vehicleManager.HealthBarValue.element.color = new pc.Color
    (
        progress >= 50 ? 2 * (100 - progress) / 100 : 1,
        progress <= 50 ? 2 * (progress) / 100 : 1,0
    );
    vehicleManager.HealthBarValue.element.width = progress * (1.62);
};

Vehicle.prototype.getDistance = function (pos1, pos2) {
    var x = pos1.x - pos2.x;
    var y = pos1.y - pos2.y;
    var z = pos1.z - pos2.z;

    var temp = new pc.Vec3(x, y, z);
    return temp.length();
};

Vehicle.prototype._Racing = function (event) {
    accelerator=this.app.root.findByName("Race_Pedal");
    accelerator.children[0].setLocalScale(0.6,0.6,0.6);
    racePedal = true;

    if(isTutorialOn)
    {
        if(isUpTutorialDone===false)
        {
            TutorialManagerGlobal=this.app.root.findByName("TutorialManager");
            if(TutorialManagerGlobal.script.tutorialManager.isUpKeyShowBool(true))
                TutorialManagerGlobal.script.tutorialManager.upKeyPressed("");
        }
    }
};
Vehicle.prototype.ComputeDistance = function(point1, point2){
    // var x = point1.x - point2.x;
    // var y = point1.y - point2.y;
    // var z = point1.z - point2.z;

    var x = point1.getPosition().x - point2.getPosition().x;
    x= x*x;
    var y = point1.getPosition().y - point2.getPosition().y;
    y = y*y;
    var z = point1.getPosition().z - point2.getPosition().z;
    z = z*z;
    var sq = x + y + z;
    var ans = Math.sqrt(sq);
    return ans;
};

Vehicle.prototype._Braking = function (event) {
    braker=this.app.root.findByName("Brake_Pedal");
    braker.children[0].setLocalScale(0.6,0.6,0.6);
    brakePedal = true;
    if(isTutorialOn)
    {
        if(isBackTutorialDone===false)
        {
            TutorialManagerGlobal=this.app.root.findByName("TutorialManager");
            if(TutorialManagerGlobal.script.tutorialManager.isBrakeKeyShowBool(true))
                TutorialManagerGlobal.script.tutorialManager.backKeyPressed("");
        }
    }
};

Vehicle.prototype._RacingEnd = function (event) {
    accelerator=this.app.root.findByName("Race_Pedal");
    accelerator.children[0].setLocalScale(0.7,0.7,0.7);
    racePedal = false;
};

Vehicle.prototype._BrakingEnd = function (event) {
    braker=this.app.root.findByName("Brake_Pedal");
    braker.children[0].setLocalScale(0.7,0.7,0.7);
    brakePedal = false;
};


Vehicle.prototype._LeftSteer = function (event) {
    leftPedal = true;
    if(isTutorialOn)
    {
        if(isLeftTutorialDone===false)
        {
            TutorialManagerGlobal=this.app.root.findByName("TutorialManager");
            if(TutorialManagerGlobal.script.tutorialManager.isLeftKeyShowBool(true))
                TutorialManagerGlobal.script.tutorialManager.leftKeyPressed("");
        }
    }
};

Vehicle.prototype._LeftSteerEnd = function (event) {
    leftPedal = false;
};

Vehicle.prototype._RightSteer = function (event) {
    rightPedal = true;
    if(isTutorialOn)
    {
        if(isRightTutorialDone===false)
        {
            TutorialManagerGlobal=this.app.root.findByName("TutorialManager");
            if(TutorialManagerGlobal.script.tutorialManager.isRightKeyShowBool(true))
                TutorialManagerGlobal.script.tutorialManager.rightKeyPressed("");
        }
    }
};

Vehicle.prototype._RightSteerEnd = function (event) {
    rightPedal = false;
};

Vehicle.prototype.onTriggerLeave = function (entity) {
    if(entity.tags.has("GateCollider"))
    {
        SlidingGateRef.script.tweenSlidingGate.OffTween();
    }

};


Vehicle.prototype.onTriggerEnter = function (entity) {

    if(isGameStart === false){
        return;
    }
    isCollided=true;
    if(entity.tags.has("enemy")){
        // if(LevelNumber === 1){
        //     if(isBtnGlown === false) return;
        // }
        var spd = this.vehicle.getRigidBody().getLinearVelocity();
        var speedUI = spd.length().toFixed(1);
        var speedBeforeColliion = Math.max(...speedArray);
        var collisionImpact = speedBeforeColliion - speedUI;

        if(isPause === false && isDead === false)
            this.soundManager.sound.slot('ObstacleSound').play();


        if(collisionImpact <= 1){
            if(collisionImpact <= 0)
                collisionImpact = 14;
            else
                collisionImpact = collisionImpact* 17;//3
        }
        else
        {
            collisionImpact = collisionImpact* 6;//2
        }

        collisionImpact = Math.floor(collisionImpact);
        if(collisionImpact === 0){
            collisionImpact = 17;//2
        }

        if(this.RemainingHealth - collisionImpact <= 0){
            this.app.fire('UpdateHealth',this.ActualHealth, this.RemainingHealth, this.RemainingHealth);
            this.RemainingHealth = 0;
            this.SetHealthValue(this.RemainingHealth);
            this.HealthText.element.text =(0).toString();
            // this.ActualHealth.enabled = false;
            this.ActualHealth.element.text = (0).toString();
            //  this.healthZero = this.app.root.findByName('health0');
            //    this.healthZero.enabled = true;
        }
        else{
            this.app.fire('UpdateHealth',this.ActualHealth, this.RemainingHealth, collisionImpact);    
            this.RemainingHealth = this.RemainingHealth - collisionImpact;
            this.SetHealthValue(this.RemainingHealth);
            this.HealthText.element.text = this.RemainingHealth;
        }

        if(this.RemainingHealth===0)
            this.ActualHealth.element.text = (0).toString();
        else
            this.ActualHealth.element.text = this.RemainingHealth;

        if(this.RemainingHealth <= 0){
            playerEntity = this.e;
            this.app.fire('GameOver',this.carChassis, this.vehicle, playerEntity);
        }
    }

    if(this.entity.tags.has("hit"))
    {
        if(CANDEBUG)
            console.log("hitcollider");
    }

    if(entity.tags.has("coin")){
        if(isTutorialOn){
            if(LevelNumber===1){
                if(isFirstTimeGamePlay){
                    if(this.isCoinCalled === false){
                        this.isCoinCalled = true;
                        this.app.fire('CoinTouch');
                    }
                }
            }
        }
        this.TrackableStatsCoinsFamobi();
        this.soundManager.sound.slot('CoinPickup').play();
        this.totalCoin++;
        TotalCurrency++;

        if(useAPI===false) //if api bool is false load/set from browser local storage or else load/set form famobi api local storage
        {
            localStorage.setItem('currency', TotalCurrency); 
        }else
        {
            window.famobi.localStorage.setItem('currency', TotalCurrency); 
        }

        if(this.totalCoin===0)
        {
            this.CoinValue.element.text = (0).toString();
            this.ActualCoin.element.text = (0).toString();
        }else
        {
            this.CoinValue.element.text = this.totalCoin;
            this.ActualCoin.element.text = this.totalCoin;
            this.TweenCoinSymbol();
        }
        entity.enabled = false;
    }
    if(entity.tags.has("NearWinPoint")){
        if(CANDEBUG)
            console.log("In WinTrigger");

        this.StripesTweenRef = pc.app.root.findByName("WinSign");
        this.StripesTweenRef.script.stripesTween.ChangeOpacity(true);
        //entity.enabled = false;
    }
    if(entity.tags.has("grass"))
        this.isGrass = true;
    if(entity.tags.has("GateCollider"))
    {
        SlidingGateRef.script.tweenSlidingGate.OnTween();
    }
    if(entity.tags.has("UpDownCollider"))
    {
        //up down collider
    }

    isCollided = false;
};


//trackable stats for famobi total coins
var total_coins_collected_ever;
Vehicle.prototype.TrackableStatsCoinsFamobi = function(){

    if(useAPI===false) //if api bool is false load/set from browser local storage or else load/set form famobi api local storage
    {
        total_coins_collected_ever=parseFloat(localStorage.getItem('total_coins_collected'))||0; 
        total_coins_collected_ever=total_coins_collected_ever+1;
        localStorage.setItem('total_coins_collected', total_coins_collected_ever); 
    }else
    {
        total_coins_collected_ever=parseFloat(window.famobi.localStorage.getItem('total_coins_collected'))||0; 
        total_coins_collected_ever=total_coins_collected_ever+1;
        window.famobi.localStorage.setItem('total_coins_collected', total_coins_collected_ever); 

        var ApiReference=this.app.root.findByTag("API");
        ApiReference[0].script.famobiApi.FamobiTrackableStats('total_coins_collected',total_coins_collected_ever); 
    }
};


var condforTweenCoin=true;
var coinSelf;
Vehicle.prototype.TweenCoinSymbol = function(){
    coinSelf=this;
    if(condforTweenCoin === true)
    {
        condforTweenCoin = false;
        coinSelf.CoinObject
            .tween(coinSelf.CoinObject.getLocalScale())
            .to(new pc.Vec3(1.3, 1.3, 1.3), 0.1, pc.SineOut)
            .yoyo(true)
            .repeat(2)
            .start().on('complete',function(){
            condforTweenCoin = true;
        });
    }
};
// this function sets all the entities and variables to their default position in the start of the level
Vehicle.prototype.OnNewLevel = function(){
    if(CANDEBUG)
        console.log("New Level Loaded");

    isDead = false;
    var body = this.carChassis;
    transformm = body.getWorldTransform();

    BusBody = body;
    //this.RestartScreen.enabled = false;
    this.LevelSuccessText.enabled = false;
    this.CoinValue = pc.app.root.findByName("CoinValue");
    this.healthZero = this.app.root.findByName('health0');

    this.healthZero.enabled = false;
    vehicleManager.ActualHealth.element.text = 100;
    this.app.fire('ResetHealth');
    this.RemainingHealth = 100;

    this.CoinValue.element.text = (0).toString();
    this.totalCoin = 0;
    vehicleManager.ActualCoin.element.text = (0).toString();

    isNearReverseSign = false;
    this.isEngineHigh = false;
    this.app.fire('UpdatePositon');
    this.app.fire('FadeOutScreen');

};


Vehicle.prototype.ManipulateBlocker = function(state) {
    var blocker=this.app.root.findByTag("_Blocker");
    if(blocker[0])
    {
        blocker[0].enabled=state;
    }
    else
    {
        console.log("not found");
    }
};

// if level is completed successfully then this function will run
Vehicle.prototype.Win = function () {
    if(isGameOver === true)// condition to avoid simultaneosly failed and win situation
        return;
    else
        isGameOver = true;

    this.ManipulateBlocker(true);
    GameWins=true;
    this.GameManager.script.gameManager.UnlockNextLevel();
    this.setSoundAtWin();
    isGameStart = false;
    this.HealthText.element.text = this.ActualHealth.element.text;
    this.GameManager.script.gameManager.IterateCoins(parseInt(this.CoinValue.element.text));
    this.GameManager.script.gameManager.ToggleNextLevelBtn(true);
    this.GameManager.script.gameManager.TurnOffReverseText();
    this.RestartScreen.enabled = true;
    previousBusUsing = busUsing;

    if(useAPI===false)
    {
        this.ManipulateBlocker(false);
        if(LevelNumber ===1)
            this.GameManager.script.gameManager.NextBtnGlow();
    }

    this.LevelSuccessText.enabled = true;
    isDead = true;

    this.TrackableStatsLevelsFamobi();

    if(useAPI===true) //if api bool is false load/set from browser local storage or else load/set form famobi api local storage
    {
        var ApiReference=this.app.root.findByTag("API");
        ApiReference[0].script.famobiApi.RegisterFamobiEvents(false,LevelNumber.toString(),false,true,false,"none",false,0,false,0,false,false,false,0,0); 
        ApiReference[0].script.famobiApi.Register_famobi_tracking(false,LevelNumber,false,0,true,true); 
    }

    if(CANDEBUG)
        console.log("Game is Won");

};

var total_Levels_completed_ever;
Vehicle.prototype.TrackableStatsLevelsFamobi = function(){

    if(useAPI===false) //if api bool is false load/set from browser local storage or else load/set form famobi api local storage
    {
        total_Levels_completed_ever=parseFloat(localStorage.getItem('total_levels_completed'))||0; 

        if(LevelNumber > total_Levels_completed_ever)
        {
            localStorage.setItem('total_levels_completed', LevelNumber); 
        }
    }else
    {
        total_Levels_completed_ever=parseFloat(window.famobi.localStorage.getItem('total_levels_completed'))||0; 

        if(LevelNumber > total_Levels_completed_ever)
        {
            window.famobi.localStorage.setItem('total_levels_completed', LevelNumber); 

            var ApiReference=this.app.root.findByTag("API");
            ApiReference[0].script.famobiApi.FamobiTrackableStats('total_levels_completed',LevelNumber); 
        }
    }
};

Vehicle.prototype.setSoundAtWin = function () {

    this.soundManager.sound.slot('EngineIdle').stop();
    this.soundManager.sound.slot('DeaccelerateSound').stop();
    this.musicManagerRef = this.app.root.findByName('Music');
    this.musicManagerRef.sound.slot('BackSound').stop();
    this.soundManager.sound.slot('EngineRunning').stop();
    this.soundManager.sound.slot('EngineHighSound').stop();
    this.soundManager.sound.slot('WinSound').play();
};

Vehicle.prototype.AttributeChangeFromUI = function () {
    this.Form.enabled = false;
    if (this.vehicle) {
        this.rollInfluence = parseFloat(this.RollInfluenceSlider.script.slider.getValue());
        //      _rollInfluence=localStorage.setItem("rollInfluence",this.rollInfluence);
        for (var i = 0; i < this.vehicle.getNumWheels(); i++) {
            var wheel = this.vehicle.getWheelInfo(i);
            wheel.set_m_rollInfluence(this.rollInfluence);
        }
    }
};

// hammer.min.js
/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.js.map

// FullScreen.js
// var FullScreen = pc.createScript('fullScreen');

// var isLandscape = false;

// FullScreen.attributes.add('maximizebutton', {
//     type: 'entity'
// });

// var OnMobile=false;

// FullScreen.attributes.add("maximizeTextures", {type: "asset", assetType: "texture", array: true, title: "Textures"});

// window.onorientationchange = readDeviceOrientation;

// // initialize code called once per entity
// FullScreen.prototype.initialize = function() {

//     readDeviceOrientation();
//     if (pc.platform.android || pc.platform.ios || pc.platform.mobile) { 
//         OnMobile=true;
//     }
//     else{
//         OnMobile = false;
//         distanceFromCam =24;
//     }

//     if(OnMobile === true){
//         this.maximizebutton.element.on('touchend', this._onMaximize, this);
//     }
//     else{
//         this.maximizebutton.element.on('mouseup', this._onMaximize, this);
//     }
// };

// // update code called every frame
// FullScreen.prototype.update = function(dt) {
//     if(!document.webkitIsFullScreen && !document.mozFullScreen){
//         var minimizeTexture = this.maximizeTextures[1].resource;
//         this.maximizebutton.element.texture=minimizeTexture; 
//     }else{
//         var maximizeTexture = this.maximizeTextures[0].resource;
//         this.maximizebutton.element.texture=maximizeTexture;
//     }

// };

// //Maximize toggle function
// FullScreen.prototype._onMaximize = function() {

//     if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
//         (!document.mozFullScreen && !document.webkitIsFullScreen)) {
//         var maximizeTexture = this.maximizeTextures[0].resource;
//         this.maximizebutton.element.texture=maximizeTexture;
//         if (document.documentElement.requestFullScreen) {
//             document.documentElement.requestFullScreen();  
//         } else if (document.documentElement.mozRequestFullScreen) {  
//             document.documentElement.mozRequestFullScreen();  
//         } else if (document.documentElement.webkitRequestFullScreen) {  
//             document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);  
//         }  
//     } else {  

//         if (document.cancelFullScreen) {  
//             document.cancelFullScreen();  
//         } else if (document.mozCancelFullScreen) {  
//             document.mozCancelFullScreen();  
//         } else if (document.webkitCancelFullScreen) {  
//             document.webkitCancelFullScreen();  
//         }  
//         var minimizeTexture = this.maximizeTextures[1].resource;
//         this.maximizebutton.element.texture=minimizeTexture;
//     } 



// };

// function readDeviceOrientation() {

//     if (Math.abs(window.orientation) === 90) {
//         // Landscape
        
//         isLandscape = true;
//         distanceFromCam = 24;


//     } else {
//         // Portrait
        
//         isLandscape = false;
//         distanceFromCam = 40;

//     }
// }


var Halo=pc.createScript("halo");Halo.attributes.add("camera",{type:"entity"}),Halo.attributes.add("unidirectional",{type:"boolean",default:!1}),Halo.tmp=new pc.Vec3,Halo.prototype.initialize=function(){this.plane=this.entity.getChildren()[0],this.parent=this.entity.getParent()},Halo.prototype.update=function(t){var a=Halo.tmp;a.copy(this.parent.forward).scale(-1);var e=this.plane.model.meshInstances;if(this.camera)if(this.entity.lookAt(this.camera.getPosition()),this.unidirectional){var i=-1*a.dot(this.camera.forward);i<0&&(i=0),e[0].setParameter("material_opacity",i)}else e[0].setParameter("material_opacity",1)};// Enemy.js
// var Enemy = pc.createScript('enemy');

// // initialize code called once per entity
// Enemy.prototype.initialize = function() {
    
// };

// // update code called every frame
// Enemy.prototype.update = function(dt) {
    
// };

// swap method called for script hot-reloading
// inherit your script state here
// Enemy.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/

// Lamborghini.js
// var Lamborghini = pc.createScript('lamborghini');

// // Script Attributes
// var racePedal = false;
// var brakePedal = false;
// var leftPedal = false;
// var rightPedal = false;
// var distanceFromCam = 24;
// var SelfLamborghini;

// Lamborghini.attributes.add('CarMass', {type:'number', default: 1000,
//                                        title: 'Car Mass'
//                                       }); 

// // top vehicle speed
// Lamborghini.attributes.add('topSpeed', {type:'number', default: 10,
//                                         title: 'Top Speed'
//                                        }); 

// // used to accelerate the vehicle
// Lamborghini.attributes.add('maxEngineForce', {type:'number', default: 1000,
//                                               title: 'Max Engine Force'
//                                              }); 

// // used for braking
// Lamborghini.attributes.add('maxBrakingForce', {type:'number', default: 30,
//                                                title: 'Max Braking Force'
//                                               }); 

// // used for steering
// Lamborghini.attributes.add('maxSteering', {type:'number', default: 0.2,
//                                            title: 'Max Steering'
//                                           }); 

// // Wheel parameters
// Lamborghini.attributes.add('suspensionStiffness', {type:'number', default: 20,
//                                                    title: 'Suspension Stiffness'
//                                                   });

// Lamborghini.attributes.add('suspensionDamping', {type:'number', default: 2.3,
//                                                  title: 'Suspension Damping'
//                                                 });

// Lamborghini.attributes.add('suspensionCompression', {type:'number', default: 4.4,
//                                                      title: 'Suspension Compression'
//                                                     });

// Lamborghini.attributes.add('suspensionRestLength', {type:'number', default: 0.6,
//                                                     title: 'Suspension Rest Length'
//                                                    });

// Lamborghini.attributes.add('rollInfluence', {type:'number', default: 2,
//                                              title: 'Roll Influence'
//                                             });

// Lamborghini.attributes.add('friction', {type:'number', default: 1000,
//                                         title: 'Friction Slip'
//                                        });


// Lamborghini.attributes.add('WheelFrictionFactor', {type:'number', default: 5,
//                                                    title: 'Wheel Friction Factor'
//                                                   });

// Lamborghini.attributes.add('ChassisName', {type:'string',
//                                           });


// Lamborghini.attributes.add('WheelFL', {type:'string',
//                                       });

// Lamborghini.attributes.add('WheelFR', {type:'string',
//                                       });

// Lamborghini.attributes.add('WheelBL', {type:'string',
//                                       });

// Lamborghini.attributes.add('WheelBR', {type:'string',
//                                       });



// // Creates a rigid body ands adds it to the physics world
// Lamborghini.prototype.localCreateRigidBody = function(mass, transform, shape) {
//     var localInertia = new Ammo.btVector3(0, 0, 0);
//     if (mass > 0) {
//         shape.calculateLocalInertia(mass, localInertia);
//     }

//     var motionState = new Ammo.btDefaultMotionState(transform); //The btDefaultMotionState provides a common implementation to synchronize world transforms with offsets
//     var bodyInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia); //The btRigidBodyConstructionInfo structure provides information to create a rigid body.
//     var body = new Ammo.btRigidBody(bodyInfo); // The btRigidBody is the main class for rigid body objects
//     body.setContactProcessingThreshold(10000.0); //https://pybullet.org/Bullet/phpBB3/viewtopic.php?t=6575
//     this.app.systems.rigidbody.dynamicsWorld.addRigidBody(body); // Add rigidbody to the world
//     return body;
// };

// // Script Declaration
// Lamborghini.prototype.create = function() { // Configuration specific for the model of buggy.

//     this.ammoVec = new Ammo.btVector3(); // New keyword is important

//     this.ReduceSpeed = new Ammo.btVector3(); // New keyword is important

//     // set to true to see debug shapes for the vehicle
//     this.DEBUG_DRAW = false;

//     this.wheelDirection = new Ammo.btVector3(0, -1, 0);
//     this.wheelAxle = new Ammo.btVector3(-1, 0, 0);

//     this.wheelsConfig = 
//         [{
//             isFront: true,
//             connection: [0.66, 0.8, 0.9], // Change Accordingly
//             radius: 0.4,
//             width: 0.4,
//             name: this.WheelFR // FRONT RIGHT WHEEL
//         },                   
//          {
//              isFront: true,
//              connection: [-0.66, 0.8, 0.9], // Change Accordingly
//              radius: 0.4,
//              width: 0.4,
//              name: this.WheelFL // FRONT LEFT WHEEL
//          },
//          {
//              isFront: false,
//              connection: [-0.66, 0.8, -1.2], // Change Accordingly
//              radius: 0.4,
//              width: 0.4,
//              name: this.WheelBL // BACK LEFT WHEEL
//          },
//          {
//              isFront: false,
//              connection: [0.66, 0.8, -1.2], // Change Accordingly
//              radius: 0.4,
//              width: 0.4,
//              name: this.WheelBR // BACK RIGHT WHEEL
//          }];
// };

// Lamborghini.prototype.postUpdate = function(dt) {
//     //this.camera.setPosition(this.entity.getPosition().x,distanceFromCam, this.entity.getPosition().z);  
// };


// Lamborghini.prototype.initialize = function () {

//     SelfLamborghini = this;
//     var walls = pc.app.root.findByPath("Root/Walls");
//     for (var wall of walls.children)
//         wall.rigidbody.friction = 2000;

//     var Box1 = pc.app.root.findByName("Box1");
//     //Box1.rigidbody.friction = 4000;

//     this.Health1 = pc.app.root.findByName("Health1");
//     this.Health2 = pc.app.root.findByName("Health2");
//     this.Health3 = pc.app.root.findByName("Health3");


//     var RacePedalBtn = this.app.root.findByName("Race_Pedal");
//     var BrakePedalBtn = this.app.root.findByName("Brake_Pedal");

//     var LeftBtn = this.app.root.findByName("Left");
//     var RightBtn = this.app.root.findByName("Right");

//     this.RightBackLight = this.app.root.findByName("RightBackLight");
//     this.LeftBackLight = this.app.root.findByName("LeftBackLight");
//     this.RightGlow = this.app.root.findByName("RightGlow");
//     this.LeftGlow = this.app.root.findByName("LeftGlow");

//     this.camera =  this.app.root.findByName("Camera");

//     var isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

//     // Setup UI Events for mobile
//     if(pc.platform.android || pc.platform.ios || pc.platform.mobile || isIOS){
//         RacePedalBtn.element.on('touchstart', this._Racing, this);
//         BrakePedalBtn.element.on('touchstart', this._Braking, this);

//         RacePedalBtn.element.on('touchend', this._RacingEnd, this);
//         BrakePedalBtn.element.on('touchend', this._BrakingEnd, this);

//         LeftBtn.element.on('touchstart', this._LeftSteer, this);
//         RightBtn.element.on('touchstart', this._RightSteer, this);

//         LeftBtn.element.on('touchend', this._LeftSteerEnd, this);
//         RightBtn.element.on('touchend', this._RightSteerEnd, this);
//     }
//     else{
//         RacePedalBtn.enabled = false;
//         BrakePedalBtn.enabled = false;
//         LeftBtn.enabled = false;
//         RightBtn.enabled = false;
//     }

//     var app = this.app;

//     this.create();

//     this.SteeringSlider = pc.app.root.findByName("SteeringSlider");
//     this.TopSpeedSlider = pc.app.root.findByName("TopSpeedSlider");
//     this.EnginePowerSlider = pc.app.root.findByName("EnginePowerSlider");
//     this.BrakingPowerSlider = pc.app.root.findByName("BrakingPowerSlider");
//     //this.RollInfluenceSlider = pc.app.root.findByName("RollInfluenceSlider");
//     //this.RollInfluenceElement = this.RollInfluenceSlider.script.slider.getSliderElement();




//     this.engineForce = 0.0;
//     this.brakingForce = 0.0;

//     this.vehicleSteering = 0.0;

//     this.debug = {
//         chassis: null,
//         wheels: []
//     };

//     this.graphics = {
//         chassis: null,
//         wheels: []
//     };

//     this.trans = new Ammo.btTransform();
//     this.quat = new pc.Quat();
//     this.pos = new pc.Vec3();
//     this.mat = new pc.Mat4();

//     this.initialRot = this.entity.getRotation().clone();
//     this.initialPos = this.entity.getPosition().clone();
//     this.direction = new pc.Vec3();

//     this.controls = false;

//     var i;

//     // Create box for chassis
//     var chassisShape = new Ammo.btBoxShape(new Ammo.btVector3(0.9, 0.5, 1.75)); // Change box shape

//     // Create compound shape that will contain the chassis shape.
//     // We use a compound shape to shift the center of mass with respect to the chassis
//     // localTrans effectively shifts the center of mass
//     var localTrans = new Ammo.btTransform();
//     localTrans.setIdentity();
//     localTrans.setOrigin(new Ammo.btVector3(0, 1, 0)); // Set origin above ground
//     var compound = new Ammo.btCompoundShape();
//     compound.addChildShape(localTrans, chassisShape);

//     // create rigid body for the chassis and position it 
//     // at the location of this entity
//     var tr = new Ammo.btTransform();
//     tr.setIdentity();
//     var p = this.entity.getPosition();
//     tr.setOrigin(new Ammo.btVector3(p.x, p.y, p.z));



//     this.carChassis = this.localCreateRigidBody(this.CarMass, tr, compound);
//     this.carChassis.entity = this.entity;

//     // Create vehicle
//     var tuning = new Ammo.btVehicleTuning(); //https://pybullet.org/Bullet/phpBB3/viewtopic.php?t=3346
//     var vehicleRayCaster = new Ammo.btDefaultVehicleRaycaster(app.systems.rigidbody.dynamicsWorld);
//     this.vehicle = new Ammo.btRaycastVehicle(tuning, this.carChassis, vehicleRayCaster);

//     // Never deactivate the vehicle
//     this.carChassis.setActivationState(pc.RIGIDBODY_DISABLE_DEACTIVATION);

//     // Add the vehicle to the dynamics world
//     app.systems.rigidbody.dynamicsWorld.addAction(this.vehicle);

//     // Choose coordinate system
//     var rightIndex = 0; 
//     var upIndex = 1; 
//     var forwardIndex = 2;
//     this.vehicle.setCoordinateSystem(rightIndex, upIndex, forwardIndex);

//     // Add wheels to the vehicle
//     var name = this.entity.getName();
//     var numWheels = this.wheelsConfig.length;

//     var wheel;

//     for (i = 0; i < numWheels; i++) {
//         wheel = this.wheelsConfig[i];
//         var connectionPoint = new Ammo.btVector3(wheel.connection[0], wheel.connection[1], wheel.connection[2]);
//         this.vehicle.addWheel(connectionPoint, this.wheelDirection, this.wheelAxle, this.suspensionRestLength, wheel.radius, tuning, wheel.isFront);
//     }

//     // Set wheel params
//     for (i = 0; i < this.vehicle.getNumWheels(); i++) {
//         wheel = this.vehicle.getWheelInfo(i);
//         wheel.set_m_suspensionStiffness(this.suspensionStiffness);
//         wheel.set_m_wheelsDampingRelaxation(this.suspensionDamping);
//         wheel.set_m_wheelsDampingCompression(this.suspensionCompression);
//         wheel.set_m_frictionSlip(this.friction);
//         wheel.m_brake = this.WheelFrictionFactor;
//         wheel.set_m_rollInfluence(this.rollInfluence);
//     }

//     // Find the actual chassis and wheel models 
//     this.graphics.chassis = this.entity.findByName(this.ChassisName);


//     for (i = 0; i < this.vehicle.getNumWheels(); i++) {
//         this.graphics.wheels[i] = this.entity.findByName(this.wheelsConfig[i].name);
//     }

//     // Create the debug graphics for the car
//     if (this.DEBUG_DRAW) {
//         var e = new pc.Entity();
//         e.setLocalScale(1.8, 1, 3.5); // Double of the bullet vehicle size
//         app.root.addChild(e);
//         e.addComponent('model', {
//             type: 'box',
//             castShadows: true
//         });

//         this.debug.chassis = e;

//         for (i = 0; i < this.vehicle.getNumWheels(); i++) {
//             wheel = this.wheelsConfig[i];

//             p = new pc.Entity();
//             app.root.addChild(p);
//             this.debug.wheels.push(p);

//             e = new pc.Entity();
//             e.setLocalEulerAngles(0, 0, 90);
//             e.setLocalScale(wheel.radius / 0.5, wheel.width, wheel.radius / 0.5);
//             p.addChild(e);
//             e.addComponent('model', {
//                 type: 'cylinder',
//                 castShadows: true
//             });
//         }
//     }

//     this.entity.collision.on('triggerenter', this.onTriggerEnter, this);

//     // Set up the events
//     var self = this;
//     this.on("enable", this.onEnable);

//     this.on("disable", this.onDisable);

//     this.on("attr", this.onAttributeChanged);

//     // this.RollInfluenceElement.oninput = function(){
//     //     if (SelfLamborghini.vehicle) {
//     //         for (var i = 0; i < SelfLamborghini.vehicle.getNumWheels(); i++) {
//     //             var wheel = SelfLamborghini.vehicle.getWheelInfo(i);
//     //             wheel.set_m_rollInfluence(parseFloat(SelfLamborghini.RollInfluenceElement.value));
//     //         }
//     //     }
//     // };

//     this.onEnable();
// };


// // Resets the vehicle to its initial position
// Lamborghini.prototype.reset = function () {
//     var body = this.carChassis;
//     var transform = body.getWorldTransform();
//     transform.setOrigin(new Ammo.btVector3(this.initialPos.x, this.initialPos.y, this.initialPos.z));
//     transform.setRotation(new Ammo.btQuaternion(this.initialRot.x, this.initialRot.y, this.initialRot.z, this.initialRot.w));
//     body.setLinearVelocity(new Ammo.btVector3(0, 0, 0));
//     body.setAngularVelocity(new Ammo.btVector3(0, 0, 0));
// };


// // Called when the vehicle is enabled
// Lamborghini.prototype.onEnable = function () {
//     this.controls = true;
// };


// // Called when the vehicle is disabled
// Lamborghini.prototype.onDisable = function () {
//     this.controls = false;
// };


// // Called when an attribute changes value in the Designer
// Lamborghini.prototype.onAttributeChanged = function (name, oldValue, newValue) {
//     if (this.vehicle) {
//         // reset parameters on all wheels
//         for (var i = 0; i < this.vehicle.getNumWheels(); i++) {
//             var wheel = this.vehicle.getWheelInfo(i);
//             wheel.set_m_suspensionStiffness(this.suspensionStiffness);
//             wheel.set_m_wheelsDampingRelaxation(this.suspensionDamping);
//             wheel.set_m_wheelsDampingCompression(this.suspensionCompression);
//             wheel.set_m_frictionSlip(this.friction);
//             wheel.set_m_rollInfluence(this.rollInfluence);
//             wheel.m_brake = this.WheelFrictionFactor;
//             this.vehicle.updateWheelTransform(i, false);
//         }
//     }
// };

// // Called every frame
// Lamborghini.prototype.update = function (dt) {    
//     var app = this.app;
//     var i;



//     // Reset the vehicle if R is pressed
//     if (app.keyboard.wasPressed(pc.KEY_R)) {
//         this.reset();
//     }

//     // Limit vehicle velocity
//     var maxVehicleSpeed = this.topSpeed;

//     this.topSpeed = parseFloat(this.TopSpeedSlider.script.slider.getValue());
//     this.maxSteering = parseFloat(this.SteeringSlider.script.slider.getValue());
//     this.maxEngineForce = parseFloat(this.EnginePowerSlider.script.slider.getValue());
//     this.brakingForce = parseFloat(this.BrakingPowerSlider.script.slider.getValue());

//     var spd = this.vehicle.getRigidBody().getLinearVelocity();
//     if (spd.length() > maxVehicleSpeed) {
//         var divisor = Math.abs(spd.length() / maxVehicleSpeed);
//         this.ammoVec.setValue(spd.x() / divisor, spd.y() / divisor, spd.z() / divisor);
//         this.vehicle.getRigidBody().setLinearVelocity(this.ammoVec);
//     }

//     this.direction.set(spd.x(), spd.y(), spd.z()).normalize();

//     // Get user input
//     var left = false;
//     var right = false;
//     var up = false;
//     var down = false;


//     if (this.controls) {
//         left = app.keyboard.isPressed(pc.KEY_A) || app.keyboard.isPressed(pc.KEY_LEFT) || leftPedal;
//         right = app.keyboard.isPressed(pc.KEY_D) || app.keyboard.isPressed(pc.KEY_RIGHT) || rightPedal;
//         up = app.keyboard.isPressed(pc.KEY_W) || app.keyboard.isPressed(pc.KEY_UP) || racePedal;
//         down = app.keyboard.isPressed(pc.KEY_S) || app.keyboard.isPressed(pc.KEY_DOWN) || brakePedal;
//     }

//     if (left && right) {
//         this.vehicleSteering = 0;
//     } else if (left) {
//         this.vehicleSteering = this.maxSteering;
//     } else if (right) {
//         this.vehicleSteering = -this.maxSteering;
//     } else {
//         this.vehicleSteering = 0;
//     }

//     if (up && down) {
//         this.engineForce = this.brakingForce = 0;
//     } else if (up) {
//         this.brakingForce = 0;
//         this.engineForce = this.maxEngineForce;
//     } else if (down) {
//         this.brakingForce = 0;
//         this.engineForce = -this.maxEngineForce;
//     } else { 
//         this.engineForce = 0;
//         this.brakingForce =0;
//     }

//     if(app.keyboard.isPressed(pc.KEY_B)){
//         this.brakingForce = this.maxBrakingForce;
//     }


//     // Apply engine and braking force to the back wheels
//     this.vehicle.applyEngineForce(this.engineForce, 2);
//     this.vehicle.setBrake(this.brakingForce, 2);
//     this.vehicle.applyEngineForce(this.engineForce, 3);
//     this.vehicle.setBrake(this.brakingForce, 3);
//     //this.vehicle.updateFriction(dt);

//     // Apply steering to the front wheels
//     this.vehicle.setSteeringValue(this.vehicleSteering, 0);
//     this.vehicle.setSteeringValue(this.vehicleSteering, 1);


//     for (i = 0; i < this.vehicle.getNumWheels(); i++) {
//         // synchronize the wheels with the (interpolated) chassis worldtransform
//         this.vehicle.updateWheelTransform(i, true);
//     }

//     // Get world transform of the chassis from the physics engine
//     this.carChassis.getMotionState().getWorldTransform(this.trans);
//     var t = this.trans;

//     var p = t.getOrigin();
//     var q = t.getRotation();
//     this.quat.set(q.x(), q.y(), q.z(), q.w());

//     // position debug shapes
//     if (this.DEBUG_DRAW) {
//         this.debug.chassis.setPosition(p.x(), p.y() + 1 , p.z());
//         this.debug.chassis.setRotation(this.quat);
//     }

//     // position chassis model
//     this.entity.setPosition(p.x(), p.y(), p.z());
//     this.entity.setRotation(this.quat);
//     this.graphics.chassis.setPosition(p.x(), p.y() + 0.7, p.z());

//     // get chassis world transform we will use it to correct
//     // the wheel positions
//     this.mat.copy(this.graphics.chassis.getWorldTransform());
//     this.mat.invert();

//     for (i = 0; i < 4; i++) {
//         t = this.vehicle.getWheelTransformWS(i);

//         p = t.getOrigin();
//         q = t.getRotation();

//         this.pos.set(p.x(), p.y(), p.z());

//         this.quat.set(q.x(), q.y(), q.z(), q.w());


//         // convert world position to local position
//         this.mat.transformPoint(this.pos, this.pos);

//         // bring the wheel models a little further in
//         if(i === 0 || i === 1) // FRONT WHEELS
//         {
//             this.pos.scale(110);
//             this.pos.y *=-0.6;
//             this.pos.x *= 1.2;
//             this.pos.z *= 0.95;
//         }
//         else if(i === 2 || i === 3) // BACK WHEELS
//         {
//             this.pos.scale(140);
//             this.pos.y *= -0.6;
//             this.pos.x *= 1.04;
//             this.pos.z *= 1.05;
//         }


//         this.graphics.wheels[i].setLocalPosition(this.pos);
//         this.graphics.wheels[i].setRotation(this.quat);

//         // position wheel debug shapes
//         if (this.DEBUG_DRAW) {
//             this.debug.wheels[i].setPosition(p.x(), p.y(), p.z());
//             this.debug.wheels[i].setRotation(this.quat);
//         }
//     }
// };

// Lamborghini.prototype.getDistance = function (pos1, pos2) {
//     var x = pos1.x - pos2.x;
//     var y = pos1.y - pos2.y;
//     var z = pos1.z - pos2.z;

//     var temp = new pc.Vec3(x, y, z);
//     return temp.length();
// };

// Lamborghini.prototype._Racing = function (event) {
//     racePedal = true;
// };

// Lamborghini.prototype._Braking = function (event) {
//     brakePedal = true;
// };

// Lamborghini.prototype._RacingEnd = function (event) {
//     racePedal = false;
// };

// Lamborghini.prototype._BrakingEnd = function (event) {
//     brakePedal = false;
// };


// Lamborghini.prototype._LeftSteer = function (event) {
//     leftPedal = true;
// };

// Lamborghini.prototype._LeftSteerEnd = function (event) {
//     leftPedal = false;
// };

// Lamborghini.prototype._RightSteer = function (event) {
//     rightPedal = true;
// };

// Lamborghini.prototype._RightSteerEnd = function (event) {
//     rightPedal = false;
// };

// Lamborghini.prototype.onTriggerEnter = function (entity) {
//     if(entity.tags.has("enemy")){
//         if(this.Health1.enabled){
//             this.Health1.enabled = false;
//         }
//         else if(this.Health2.enabled){
//             this.Health2.enabled = false;
//         }
//         else if(this.Health3.enabled){
//             this.Health3.enabled = false;
//         }
//     }
// };

// touch-input.js
// var TouchInput = pc.createScript('touchInput');

// TouchInput.attributes.add('orbitSensitivity', {
//     type: 'number', 
//     default: 0.4, 
//     title: 'Orbit Sensitivity', 
//     description: 'How fast the camera moves around the orbit. Higher is faster'
// });

// TouchInput.attributes.add('distanceSensitivity', {
//     type: 'number', 
//     default: 0.2, 
//     title: 'Distance Sensitivity', 
//     description: 'How fast the camera moves in and out. Higher is faster'
// });

// // initialize code called once per entity
// TouchInput.prototype.initialize = function() {
//     this.orbitCamera = this.entity.script.orbitCamera;
    
//     // Store the position of the touch so we can calculate the distance moved
//     this.lastTouchPoint = new pc.Vec2();
//     this.lastPinchMidPoint = new pc.Vec2();
//     this.lastPinchDistance = 0;
    
//     if (this.orbitCamera && this.app.touch) {
//         // Use the same callback for the touchStart, touchEnd and touchCancel events as they 
//         // all do the same thing which is to deal the possible multiple touches to the screen
//         this.app.touch.on(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
//         this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
//         this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);
        
//         this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
        
//         this.on('destroy', function() {
//             this.app.touch.off(pc.EVENT_TOUCHSTART, this.onTouchStartEndCancel, this);
//             this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchStartEndCancel, this);
//             this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchStartEndCancel, this);

//             this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
//         });
//     }
// };


// TouchInput.prototype.getPinchDistance = function (pointA, pointB) {
//     // Return the distance between the two points
//     var dx = pointA.x - pointB.x;
//     var dy = pointA.y - pointB.y;    
    
//     return Math.sqrt((dx * dx) + (dy * dy));
// };


// TouchInput.prototype.calcMidPoint = function (pointA, pointB, result) {
//     result.set(pointB.x - pointA.x, pointB.y - pointA.y);
//     result.scale(0.5);
//     result.x += pointA.x;
//     result.y += pointA.y;
// };


// TouchInput.prototype.onTouchStartEndCancel = function(event) {
//     // We only care about the first touch for camera rotation. As the user touches the screen, 
//     // we stored the current touch position
//     var touches = event.touches;
//     if (touches.length == 1) {
//         this.lastTouchPoint.set(touches[0].x, touches[0].y);
    
//     } else if (touches.length == 2) {
//         // If there are 2 touches on the screen, then set the pinch distance
//         this.lastPinchDistance = this.getPinchDistance(touches[0], touches[1]);
//         this.calcMidPoint(touches[0], touches[1], this.lastPinchMidPoint);
//     }
// };


// TouchInput.fromWorldPoint = new pc.Vec3();
// TouchInput.toWorldPoint = new pc.Vec3();
// TouchInput.worldDiff = new pc.Vec3();


// TouchInput.prototype.pan = function(midPoint) {
//     var fromWorldPoint = TouchInput.fromWorldPoint;
//     var toWorldPoint = TouchInput.toWorldPoint;
//     var worldDiff = TouchInput.worldDiff;
    
//     // For panning to work at any zoom level, we use screen point to world projection
//     // to work out how far we need to pan the pivotEntity in world space 
//     var camera = this.entity.camera;
//     var distance = this.orbitCamera.distance;
    
//     camera.screenToWorld(midPoint.x, midPoint.y, distance, fromWorldPoint);
//     camera.screenToWorld(this.lastPinchMidPoint.x, this.lastPinchMidPoint.y, distance, toWorldPoint);
    
//     worldDiff.sub2(toWorldPoint, fromWorldPoint);
     
//     this.orbitCamera.pivotPoint.add(worldDiff);    
// };


// TouchInput.pinchMidPoint = new pc.Vec2();

// TouchInput.prototype.onTouchMove = function(event) {
//     var pinchMidPoint = TouchInput.pinchMidPoint;
    
//     // We only care about the first touch for camera rotation. Work out the difference moved since the last event
//     // and use that to update the camera target position 
//     var touches = event.touches;
//     if (touches.length == 1) {
//         var touch = touches[0];
        
//         this.orbitCamera.pitch -= (touch.y - this.lastTouchPoint.y) * this.orbitSensitivity;
//         this.orbitCamera.yaw -= (touch.x - this.lastTouchPoint.x) * this.orbitSensitivity;
        
//         this.lastTouchPoint.set(touch.x, touch.y);
    
//     } else if (touches.length == 2) {
//         // Calculate the difference in pinch distance since the last event
//         var currentPinchDistance = this.getPinchDistance(touches[0], touches[1]);
//         var diffInPinchDistance = currentPinchDistance - this.lastPinchDistance;
//         this.lastPinchDistance = currentPinchDistance;
                
//         this.orbitCamera.distance -= (diffInPinchDistance * this.distanceSensitivity * 0.1) * (this.orbitCamera.distance * 0.1);
        
//         // Calculate pan difference
//         this.calcMidPoint(touches[0], touches[1], pinchMidPoint);
//         this.pan(pinchMidPoint);
//         this.lastPinchMidPoint.copy(pinchMidPoint);
//     }
// };


// orbit-camera.js
// var OrbitCamera = pc.createScript('orbitCamera');

// OrbitCamera.attributes.add('distanceMax', {type: 'number', default: 0, title: 'Distance Max', description: 'Setting this at 0 will give an infinite distance limit'});
// OrbitCamera.attributes.add('distanceMin', {type: 'number', default: 0, title: 'Distance Min'});
// OrbitCamera.attributes.add('pitchAngleMax', {type: 'number', default: 90, title: 'Pitch Angle Max (degrees)'});
// OrbitCamera.attributes.add('pitchAngleMin', {type: 'number', default: -90, title: 'Pitch Angle Min (degrees)'});

// OrbitCamera.attributes.add('inertiaFactor', {
//     type: 'number',
//     default: 0,
//     title: 'Inertia Factor',
//     description: 'Higher value means that the camera will continue moving after the user has stopped dragging. 0 is fully responsive.'
// });

// OrbitCamera.attributes.add('focusEntity', {
//     type: 'entity',
//     title: 'Focus Entity',
//     description: 'Entity for the camera to focus on. If blank, then the camera will use the whole scene'
// });

// OrbitCamera.attributes.add('frameOnStart', {
//     type: 'boolean',
//     default: true,
//     title: 'Frame on Start',
//     description: 'Frames the entity or scene at the start of the application."'
// });


// // Property to get and set the distance between the pivot point and camera
// // Clamped between this.distanceMin and this.distanceMax
// Object.defineProperty(OrbitCamera.prototype, "distance", {
//     get: function() {
//         return this._targetDistance;
//     },

//     set: function(value) {
//         this._targetDistance = this._clampDistance(value);
//     }
// });


// // Property to get and set the pitch of the camera around the pivot point (degrees)
// // Clamped between this.pitchAngleMin and this.pitchAngleMax
// // When set at 0, the camera angle is flat, looking along the horizon
// Object.defineProperty(OrbitCamera.prototype, "pitch", {
//     get: function() {
//         return this._targetPitch;
//     },

//     set: function(value) {
//         this._targetPitch = this._clampPitchAngle(value);
//     }
// });


// // Property to get and set the yaw of the camera around the pivot point (degrees)
// Object.defineProperty(OrbitCamera.prototype, "yaw", {
//     get: function() {
//         return this._targetYaw;
//     },

//     set: function(value) {
//         this._targetYaw = value;

//         // Ensure that the yaw takes the shortest route by making sure that 
//         // the difference between the targetYaw and the actual is 180 degrees
//         // in either direction
//         var diff = this._targetYaw - this._yaw;
//         var reminder = diff % 360;
//         if (reminder > 180) {
//             this._targetYaw = this._yaw - (360 - reminder);
//         } else if (reminder < -180) {
//             this._targetYaw = this._yaw + (360 + reminder);
//         } else {
//             this._targetYaw = this._yaw + reminder;
//         }
//     }
// });


// // Property to get and set the world position of the pivot point that the camera orbits around
// Object.defineProperty(OrbitCamera.prototype, "pivotPoint", {
//     get: function() {
//         return this._pivotPoint;
//     },

//     set: function(value) {
//         this._pivotPoint.copy(value);
//     }
// });


// // Moves the camera to look at an entity and all its children so they are all in the view
// OrbitCamera.prototype.focus = function (focusEntity) {
//     // Calculate an bounding box that encompasses all the models to frame in the camera view
//     this._buildAabb(focusEntity, 0);

//     var halfExtents = this._modelsAabb.halfExtents;

//     var distance = Math.max(halfExtents.x, Math.max(halfExtents.y, halfExtents.z));
//     distance = (distance / Math.tan(0.5 * this.entity.camera.fov * pc.math.DEG_TO_RAD));
//     distance = (distance * 2);

//     this.distance = distance;

//     this._removeInertia();

//     this._pivotPoint.copy(this._modelsAabb.center);
// };


// OrbitCamera.distanceBetween = new pc.Vec3();

// // Set the camera position to a world position and look at a world position
// // Useful if you have multiple viewing angles to swap between in a scene
// OrbitCamera.prototype.resetAndLookAtPoint = function (resetPoint, lookAtPoint) {
//     this.pivotPoint.copy(lookAtPoint);
//     this.entity.setPosition(resetPoint);

//     this.entity.lookAt(lookAtPoint);

//     var distance = OrbitCamera.distanceBetween;
//     distance.sub2(lookAtPoint, resetPoint);
//     this.distance = distance.length();

//     this.pivotPoint.copy(lookAtPoint);

//     var cameraQuat = this.entity.getRotation();
//     this.yaw = this._calcYaw(cameraQuat);
//     this.pitch = this._calcPitch(cameraQuat, this.yaw);

//     this._removeInertia();
//     this._updatePosition();
// };


// // Set camera position to a world position and look at an entity in the scene
// // Useful if you have multiple models to swap between in a scene
// OrbitCamera.prototype.resetAndLookAtEntity = function (resetPoint, entity) {
//     this._buildAabb(entity, 0);
//     this.resetAndLookAtPoint(resetPoint, this._modelsAabb.center);
// };


// // Set the camera at a specific, yaw, pitch and distance without inertia (instant cut)
// OrbitCamera.prototype.reset = function (yaw, pitch, distance) {
//     this.pitch = pitch;
//     this.yaw = yaw;
//     this.distance = distance;

//     this._removeInertia();
// };

// /////////////////////////////////////////////////////////////////////////////////////////////
// // Private methods

// OrbitCamera.prototype.initialize = function () {
//     var self = this;
//     var onWindowResize = function () {
//         self._checkAspectRatio();
//     };

//     window.addEventListener('resize', onWindowResize, false);

//     this._checkAspectRatio();

//     // Find all the models in the scene that are under the focused entity
//     this._modelsAabb = new pc.BoundingBox();
//     this._buildAabb(this.focusEntity || this.app.root, 0);

//     this.entity.lookAt(this._modelsAabb.center);

//     this._pivotPoint = new pc.Vec3();
//     this._pivotPoint.copy(this._modelsAabb.center);

//     // Calculate the camera euler angle rotation around x and y axes
//     // This allows us to place the camera at a particular rotation to begin with in the scene
//     var cameraQuat = this.entity.getRotation();

//     // Preset the camera
//     this._yaw = this._calcYaw(cameraQuat);
//     this._pitch = this._clampPitchAngle(this._calcPitch(cameraQuat, this._yaw));
//     this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0);

//     this._distance = 0;

//     this._targetYaw = this._yaw;
//     this._targetPitch = this._pitch;

//     // If we have ticked focus on start, then attempt to position the camera where it frames
//     // the focused entity and move the pivot point to entity's position otherwise, set the distance
//     // to be between the camera position in the scene and the pivot point
//     if (this.frameOnStart) {
//         this.focus(this.focusEntity || this.app.root);
//     } else {
//         var distanceBetween = new pc.Vec3();
//         distanceBetween.sub2(this.entity.getPosition(), this._pivotPoint);
//         this._distance = this._clampDistance(distanceBetween.length());
//     }

//     this._targetDistance = this._distance;

//     // Reapply the clamps if they are changed in the editor
//     this.on('attr:distanceMin', function (value, prev) {
//         this._targetDistance = this._clampDistance(this._distance);
//     });

//     this.on('attr:distanceMax', function (value, prev) {
//         this._targetDistance = this._clampDistance(this._distance);
//     });

//     this.on('attr:pitchAngleMin', function (value, prev) {
//         this._targetPitch = this._clampPitchAngle(this._pitch);
//     });

//     this.on('attr:pitchAngleMax', function (value, prev) {
//         this._targetPitch = this._clampPitchAngle(this._pitch);
//     });

//     // Focus on the entity if we change the focus entity
//     this.on('attr:focusEntity', function (value, prev) {
//         if (this.frameOnStart) {
//             this.focus(value || this.app.root);
//         } else {
//             this.resetAndLookAtEntity(this.entity.getPosition(), value || this.app.root);
//         }
//     });

//     this.on('attr:frameOnStart', function (value, prev) {
//         if (value) {
//             this.focus(this.focusEntity || this.app.root);
//         }
//     });

//     this.on('destroy', function() {
//         window.removeEventListener('resize', onWindowResize, false);
//     });
// };


// OrbitCamera.prototype.update = function(dt) {
//     // Add inertia, if any
//     var t = this.inertiaFactor === 0 ? 1 : Math.min(dt / this.inertiaFactor, 1);
//     this._distance = pc.math.lerp(this._distance, this._targetDistance, t);
//     this._yaw = pc.math.lerp(this._yaw, this._targetYaw, t);
//     this._pitch = pc.math.lerp(this._pitch, this._targetPitch, t);

//     this._updatePosition();
// };


// OrbitCamera.prototype._updatePosition = function () {
//     // Work out the camera position based on the pivot point, pitch, yaw and distance
//     this.entity.setLocalPosition(0,0,0);
//     this.entity.setLocalEulerAngles(this._pitch, this._yaw, 0);

//     var position = this.entity.getPosition();
//     position.copy(this.entity.forward);
//     position.scale(-this._distance);
//     position.add(this.pivotPoint);
//     this.entity.setPosition(position);
// };


// OrbitCamera.prototype._removeInertia = function () {
//     this._yaw = this._targetYaw;
//     this._pitch = this._targetPitch;
//     this._distance = this._targetDistance;
// };


// OrbitCamera.prototype._checkAspectRatio = function () {
//     var height = this.app.graphicsDevice.height;
//     var width = this.app.graphicsDevice.width;

//     // Match the axis of FOV to match the aspect ratio of the canvas so
//     // the focused entities is always in frame
//     this.entity.camera.horizontalFov = height > width;
// };


// OrbitCamera.prototype._buildAabb = function (entity, modelsAdded) {
//     var i = 0;

//     if (entity.model) {
//         var mi = entity.model.meshInstances;
//         for (i = 0; i < mi.length; i++) {
//             if (modelsAdded === 0) {
//                 this._modelsAabb.copy(mi[i].aabb);
//             } else {
//                 this._modelsAabb.add(mi[i].aabb);
//             }

//             modelsAdded += 1;
//         }
//     }

//     for (i = 0; i < entity.children.length; ++i) {
//         modelsAdded += this._buildAabb(entity.children[i], modelsAdded);
//     }

//     return modelsAdded;
// };


// OrbitCamera.prototype._calcYaw = function (quat) {
//     var transformedForward = new pc.Vec3();
//     quat.transformVector(pc.Vec3.FORWARD, transformedForward);

//     return Math.atan2(-transformedForward.x, -transformedForward.z) * pc.math.RAD_TO_DEG;
// };


// OrbitCamera.prototype._clampDistance = function (distance) {
//     if (this.distanceMax > 0) {
//         return pc.math.clamp(distance, this.distanceMin, this.distanceMax);
//     } else {
//         return Math.max(distance, this.distanceMin);
//     }
// };


// OrbitCamera.prototype._clampPitchAngle = function (pitch) {
//     // Negative due as the pitch is inversed since the camera is orbiting the entity
//     return pc.math.clamp(pitch, -this.pitchAngleMax, -this.pitchAngleMin);
// };


// OrbitCamera.quatWithoutYaw = new pc.Quat();
// OrbitCamera.yawOffset = new pc.Quat();

// OrbitCamera.prototype._calcPitch = function(quat, yaw) {
//     var quatWithoutYaw = OrbitCamera.quatWithoutYaw;
//     var yawOffset = OrbitCamera.yawOffset;

//     yawOffset.setFromEulerAngles(0, -yaw, 0);
//     quatWithoutYaw.mul2(yawOffset, quat);

//     var transformedForward = new pc.Vec3();

//     quatWithoutYaw.transformVector(pc.Vec3.FORWARD, transformedForward);

//     return Math.atan2(transformedForward.y, -transformedForward.z) * pc.math.RAD_TO_DEG;
// };

// mouse-input.js
// var MouseInput = pc.createScript('mouseInput');

// MouseInput.attributes.add('orbitSensitivity', {
//     type: 'number', 
//     default: 0.3, 
//     title: 'Orbit Sensitivity', 
//     description: 'How fast the camera moves around the orbit. Higher is faster'
// });

// MouseInput.attributes.add('distanceSensitivity', {
//     type: 'number', 
//     default: 0.15, 
//     title: 'Distance Sensitivity', 
//     description: 'How fast the camera moves in and out. Higher is faster'
// });

// // initialize code called once per entity
// MouseInput.prototype.initialize = function() {
   
//     this.orbitCamera = this.entity.script.orbitCamera;
        
//     if (this.orbitCamera) {
//         var self = this;
        
//         var onMouseOut = function (e) {
//            self.onMouseOut(e);
//         };
        
//         this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
//         this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
//         this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
//         this.app.mouse.on(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);

//         // Listen to when the mouse travels out of the window
//         window.addEventListener('mouseout', onMouseOut, false);
        
//         // Remove the listeners so if this entity is destroyed
//         this.on('destroy', function() {
//             this.app.mouse.off(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
//             this.app.mouse.off(pc.EVENT_MOUSEUP, this.onMouseUp, this);
//             this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
//             this.app.mouse.off(pc.EVENT_MOUSEWHEEL, this.onMouseWheel, this);

//             window.removeEventListener('mouseout', onMouseOut, false);
//         });
//     }
    
//     // Disabling the context menu stops the browser displaying a menu when
//     // you right-click the page
//     this.app.mouse.disableContextMenu();
  
//     this.lookButtonDown = false;
//     this.panButtonDown = false;
//     this.lastPoint = new pc.Vec2();
// };


// MouseInput.fromWorldPoint = new pc.Vec3();
// MouseInput.toWorldPoint = new pc.Vec3();
// MouseInput.worldDiff = new pc.Vec3();


// MouseInput.prototype.pan = function(screenPoint) {
//     var fromWorldPoint = MouseInput.fromWorldPoint;
//     var toWorldPoint = MouseInput.toWorldPoint;
//     var worldDiff = MouseInput.worldDiff;
    
//     // For panning to work at any zoom level, we use screen point to world projection
//     // to work out how far we need to pan the pivotEntity in world space 
//     var camera = this.entity.camera;
//     var distance = this.orbitCamera.distance;
    
//     camera.screenToWorld(screenPoint.x, screenPoint.y, distance, fromWorldPoint);
//     camera.screenToWorld(this.lastPoint.x, this.lastPoint.y, distance, toWorldPoint);

//     worldDiff.sub2(toWorldPoint, fromWorldPoint);
       
//     this.orbitCamera.pivotPoint.add(worldDiff);    
// };


// MouseInput.prototype.onMouseDown = function (event) {
//     switch (event.button) {
//         case pc.MOUSEBUTTON_LEFT: {
//             this.lookButtonDown = true;
//         } break;
            
//         case pc.MOUSEBUTTON_MIDDLE: 
//         case pc.MOUSEBUTTON_RIGHT: {
//             this.panButtonDown = true;
//         } break;
//     }
// };


// MouseInput.prototype.onMouseUp = function (event) {
//     switch (event.button) {
//         case pc.MOUSEBUTTON_LEFT: {
//             this.lookButtonDown = false;
//         } break;
            
//         case pc.MOUSEBUTTON_MIDDLE: 
//         case pc.MOUSEBUTTON_RIGHT: {
//             this.panButtonDown = false;            
//         } break;
//     }
// };


// MouseInput.prototype.onMouseMove = function (event) {    
//     var mouse = pc.app.mouse;
//     if (this.lookButtonDown) {
//         this.orbitCamera.pitch -= event.dy * this.orbitSensitivity;
//         this.orbitCamera.yaw -= event.dx * this.orbitSensitivity;
        
//     } else if (this.panButtonDown) {
//         this.pan(event);   
//     }
    
//     this.lastPoint.set(event.x, event.y);
// };


// MouseInput.prototype.onMouseWheel = function (event) {
//     this.orbitCamera.distance -= event.wheel * this.distanceSensitivity * (this.orbitCamera.distance * 0.1);
//     event.event.preventDefault();
// };


// MouseInput.prototype.onMouseOut = function (event) {
//     this.lookButtonDown = false;
//     this.panButtonDown = false;
// };

var LimitFps=pc.createScript("limitFps");LimitFps.attributes.add("targetFps",{type:"number",default:30}),LimitFps.prototype.initialize=function(){this.app;this.limit(this.targetFps),this.on("attr:targetFps",function(t,i){this.limit(t)})},LimitFps.prototype.limit=function(t){var i=this.app;this.intervalId&&(clearInterval(this.intervalId),this.intervalId=null),t>=60?i.autoRender=!0:(i.autoRender=!1,this.intervalId=setInterval(function(){i.renderNextFrame=!0},1e3/t))};var Checkbox=pc.createScript("checkbox");Checkbox.attributes.add("default",{type:"boolean"}),Checkbox.prototype.initialize=function(){this.element=document.createElement("input"),this.element.type="checkbox",this.element.style.position="absolute",this.element.style.border="0px",this.element.style.background="transparent",this.element.style.outline="none",this.element.style.margin="0 auto",this.element.style.padding="auto",this.element.checked=this.default,document.body.appendChild(this.element),this.updateStyle(),this.on("state",function(e){this.entity.enabled?this.element.style.display="block":this.element.style.display="none"},this)},Checkbox.prototype.updateStyle=function(){if(this.entity.element.screenCorners){var e=this.entity.element.screenCorners;this.element.style.left=e[0].x+"px",this.element.style.bottom=e[0].y+"px",this.element.style.width=e[2].x-e[0].x+"px",this.element.style.height=e[2].y-e[0].y+"px"}},Checkbox.prototype.update=function(e){this.updateStyle()},Checkbox.prototype.getValue=function(){if(this.element)return this.element.checked};var Demo=pc.createScript("demo");Demo.attributes.add("checkboxEntity",{type:"entity"}),Demo.attributes.add("formElement",{type:"entity"}),Demo.attributes.add("SteeringsliderElement",{type:"entity"}),Demo.attributes.add("SteeringsliderValue",{type:"entity"}),Demo.attributes.add("SpeedsliderElement",{type:"entity"}),Demo.attributes.add("SpeedsliderValue",{type:"entity"}),Demo.attributes.add("EnginePowersliderElement",{type:"entity"}),Demo.attributes.add("EnginePowersliderValue",{type:"entity"}),Demo.attributes.add("BrakingPowersliderElement",{type:"entity"}),Demo.attributes.add("BrakingPowersliderValue",{type:"entity"}),Demo.attributes.add("RollInfluenceElement",{type:"entity"}),Demo.attributes.add("RollInfluenceValue",{type:"entity"}),Demo.attributes.add("EngineForceDecrementSlider",{type:"entity"}),Demo.attributes.add("EngineForceDecreaseVal",{type:"entity"}),Demo.prototype.update=function(e){this.SteeringsliderValue.element.text=this.SteeringsliderElement.script.slider.getValue(),this.SpeedsliderValue.element.text=this.SpeedsliderElement.script.slider.getValue(),this.EnginePowersliderValue.element.text=this.EnginePowersliderElement.script.slider.getValue(),this.BrakingPowersliderValue.element.text=this.BrakingPowersliderElement.script.slider.getValue(),this.RollInfluenceValue.element.text=this.RollInfluenceElement.script.slider.getValue(),this.EngineForceDecreaseVal.element.text=this.EngineForceDecrementSlider.script.slider.getValue(),this.checkboxEntity.script.checkbox.getValue()?this.formElement.enabled=!0:this.formElement.enabled=!1};var newself,Slider=pc.createScript("slider");Slider.attributes.add("min",{type:"number",default:0}),Slider.attributes.add("max",{type:"number",default:100}),Slider.attributes.add("step",{type:"number",default:1}),Slider.attributes.add("defaultValue",{type:"number",default:1}),Slider.prototype.initialize=function(){this.element=document.createElement("input"),this.element.type="range",this.element.min=this.min,this.element.max=this.max,this.element.step=this.step,this.element.value=this.defaultValue,this.element.style.position="absolute",this.element.style.fontFamily=this.fontFamily,this.element.style.border="0px",this.element.style.margin="0px",this.element.style.padding="0px",this.element.style.background="transparent",this.element.style.boxSizing="border-box",this.element.style.outline="none",document.body.appendChild(this.element),newself=this,this.updateStyle(),this.on("state",function(e){this.entity.enabled?this.element.style.display="block":this.element.style.display="none"},this)},Slider.prototype.onFocus=function(){this.focusEntity.enabled=!0},Slider.prototype.onBlur=function(){this.focusEntity.enabled=!1},Slider.prototype.updateStyle=function(){if(this.entity.element.screenCorners){var e=this.entity.element.screenCorners;this.element.style.left=e[0].x+"px",this.element.style.bottom=e[0].y+"px",this.element.style.width=e[2].x-e[0].x+"px",this.element.style.height=e[2].y-e[0].y+"px"}},Slider.prototype.update=function(e){this.updateStyle()},Slider.prototype.getValue=function(){if(this.element)return this.element.value},Slider.prototype.SetValue=function(e){this.element.value=e},Slider.prototype.getSliderElement=function(){return this.element};// Bike.js
// var Bike = pc.createScript('bike');

// // Script Attributes
// var racePedal = false;
// var brakePedal = false;
// var leftPedal = false;
// var rightPedal = false;
// var distanceFromCam = 24;
// var SelfLamborghini;

// Bike.attributes.add('CarMass', {type:'number', default: 1000,
//                                 title: 'Car Mass'
//                                }); 

// // top vehicle speed
// Bike.attributes.add('topSpeed', {type:'number', default: 10,
//                                  title: 'Top Speed'
//                                 }); 

// // used to accelerate the vehicle
// Bike.attributes.add('maxEngineForce', {type:'number', default: 1000,
//                                        title: 'Max Engine Force'
//                                       }); 

// // used for braking
// Bike.attributes.add('maxBrakingForce', {type:'number', default: 30,
//                                         title: 'Max Braking Force'
//                                        }); 

// // used for steering
// Bike.attributes.add('maxSteering', {type:'number', default: 0.2,
//                                     title: 'Max Steering'
//                                    }); 

// // Wheel parameters
// Bike.attributes.add('suspensionStiffness', {type:'number', default: 20,
//                                             title: 'Suspension Stiffness'
//                                            });

// Bike.attributes.add('suspensionDamping', {type:'number', default: 2.3,
//                                           title: 'Suspension Damping'
//                                          });

// Bike.attributes.add('suspensionCompression', {type:'number', default: 4.4,
//                                               title: 'Suspension Compression'
//                                              });

// Bike.attributes.add('suspensionRestLength', {type:'number', default: 0.6,
//                                              title: 'Suspension Rest Length'
//                                             });

// Bike.attributes.add('rollInfluence', {type:'number', default: 2,
//                                       title: 'Roll Influence'
//                                      });

// Bike.attributes.add('friction', {type:'number', default: 1000,
//                                  title: 'Friction Slip'
//                                 });


// Bike.attributes.add('WheelFrictionFactor', {type:'number', default: 5,
//                                             title: 'Wheel Friction Factor'
//                                            });

// Bike.attributes.add('ChassisName', {type:'string',
//                                    });


// Bike.attributes.add('WheelFL', {type:'string',
//                                });

// Bike.attributes.add('WheelFR', {type:'string',
//                                });

// Bike.attributes.add('WheelBL', {type:'string',
//                                });

// Bike.attributes.add('WheelBR', {type:'string',
//                                });


// // Creates a rigid body ands adds it to the physics world
// Bike.prototype.localCreateRigidBody = function(mass, transform, shape) {
//     var localInertia = new Ammo.btVector3(0, 0, 0);
//     if (mass > 0) {
//         shape.calculateLocalInertia(mass, localInertia);
//     }

//     var motionState = new Ammo.btDefaultMotionState(transform); //The btDefaultMotionState provides a common implementation to synchronize world transforms with offsets
//     var bodyInfo = new Ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia); //The btRigidBodyConstructionInfo structure provides information to create a rigid body.
//     var body = new Ammo.btRigidBody(bodyInfo); // The btRigidBody is the main class for rigid body objects
//     body.setContactProcessingThreshold(10000.0); //https://pybullet.org/Bullet/phpBB3/viewtopic.php?t=6575
//     this.app.systems.rigidbody.dynamicsWorld.addRigidBody(body); // Add rigidbody to the world
//     return body;
// };

// // Script Declaration
// Bike.prototype.create = function() { // Configuration specific for the model of buggy.

//     this.ammoVec = new Ammo.btVector3(); // New keyword is important

//     this.ReduceSpeed = new Ammo.btVector3(); // New keyword is important

//     // set to true to see debug shapes for the vehicle
//     this.DEBUG_DRAW = false;

//     this.wheelDirection = new Ammo.btVector3(0, -1, 0);
//     this.wheelAxle = new Ammo.btVector3(-1, 0, 0);

//     this.wheelsConfig = 
//         [{
//             isFront: true,
//             connection: [0.11, 0.8, 1.1], // Change Accordingly
//             radius: 0.4,
//             width: 0.4,
//             name: this.WheelFR // FRONT RIGHT WHEEL
//         },    
//          {
//              isFront: true,
//              connection: [-0.66, 0.8, 0.9], // Change Accordingly
//              radius: 0.4,
//              width: 0.4,
//              name: this.WheelFL // FRONT LEFT WHEEL
//          },
//          {
//              isFront: false,
//              connection: [-0.11, 0.8, -1.2], // Change Accordingly
//              radius: 0.4,
//              width: 0.4,
//              name: this.WheelBL // BACK LEFT WHEEL
//          },
//          {
//              isFront: false,
//              connection: [0.66, 0.8, -1.2], // Change Accordingly
//              radius: 0.4,
//              width: 0.4,
//              name: this.WheelBR // BACK RIGHT WHEEL
//          }


//         ];
// };

// Bike.prototype.postUpdate = function(dt) {
//     //this.camera.setPosition(this.entity.getPosition().x,distanceFromCam, this.entity.getPosition().z);  
// };


// Bike.prototype.initialize = function () {

//     SelfLamborghini = this;
//     var walls = pc.app.root.findByPath("Root/Walls");
//     for (var wall of walls.children)
//         wall.rigidbody.friction = 2000;

//     var Box1 = pc.app.root.findByName("Box1");
//     //Box1.rigidbody.friction = 4000;

//     this.Health1 = pc.app.root.findByName("Health1");
//     this.Health2 = pc.app.root.findByName("Health2");
//     this.Health3 = pc.app.root.findByName("Health3");


//     var RacePedalBtn = this.app.root.findByName("Race_Pedal");
//     var BrakePedalBtn = this.app.root.findByName("Brake_Pedal");

//     var LeftBtn = this.app.root.findByName("Left");
//     var RightBtn = this.app.root.findByName("Right");

//     this.RightBackLight = this.app.root.findByName("RightBackLight");
//     this.LeftBackLight = this.app.root.findByName("LeftBackLight");
//     this.RightGlow = this.app.root.findByName("RightGlow");
//     this.LeftGlow = this.app.root.findByName("LeftGlow");

//     this.camera =  this.app.root.findByName("Camera");

//     var isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

//     // Setup UI Events for mobile
//     if(pc.platform.android || pc.platform.ios || pc.platform.mobile || isIOS){
//         RacePedalBtn.element.on('touchstart', this._Racing, this);
//         BrakePedalBtn.element.on('touchstart', this._Braking, this);

//         RacePedalBtn.element.on('touchend', this._RacingEnd, this);
//         BrakePedalBtn.element.on('touchend', this._BrakingEnd, this);

//         LeftBtn.element.on('touchstart', this._LeftSteer, this);
//         RightBtn.element.on('touchstart', this._RightSteer, this);

//         LeftBtn.element.on('touchend', this._LeftSteerEnd, this);
//         RightBtn.element.on('touchend', this._RightSteerEnd, this);
//     }
//     else{
//         RacePedalBtn.enabled = false;
//         BrakePedalBtn.enabled = false;
//         LeftBtn.enabled = false;
//         RightBtn.enabled = false;
//     }

//     var app = this.app;

//     this.create();

//     this.SteeringSlider = pc.app.root.findByName("SteeringSlider");
//     this.TopSpeedSlider = pc.app.root.findByName("TopSpeedSlider");
//     this.EnginePowerSlider = pc.app.root.findByName("EnginePowerSlider");
//     this.BrakingPowerSlider = pc.app.root.findByName("BrakingPowerSlider");
//     //this.RollInfluenceSlider = pc.app.root.findByName("RollInfluenceSlider");
//     //this.RollInfluenceElement = this.RollInfluenceSlider.script.slider.getSliderElement();




//     this.engineForce = 0.0;
//     this.brakingForce = 0.0;

//     this.vehicleSteering = 0.0;

//     this.debug = {
//         chassis: null,
//         wheels: []
//     };

//     this.graphics = {
//         chassis: null,
//         wheels: []
//     };

//     this.trans = new Ammo.btTransform();
//     this.quat = new pc.Quat();
//     this.pos = new pc.Vec3();
//     this.mat = new pc.Mat4();

//     this.initialRot = this.entity.getRotation().clone();
//     this.initialPos = this.entity.getPosition().clone();
//     this.direction = new pc.Vec3();

//     this.controls = false;

//     var i;

//     // Create box for chassis
//     var chassisShape = new Ammo.btBoxShape(new Ammo.btVector3(0.9, 0.5, 1.75)); // Change box shape

//     // Create compound shape that will contain the chassis shape.
//     // We use a compound shape to shift the center of mass with respect to the chassis
//     // localTrans effectively shifts the center of mass
//     var localTrans = new Ammo.btTransform();
//     localTrans.setIdentity();
//     localTrans.setOrigin(new Ammo.btVector3(0, 1, 0)); // Set origin above ground
//     var compound = new Ammo.btCompoundShape();
//     compound.addChildShape(localTrans, chassisShape);

//     // create rigid body for the chassis and position it 
//     // at the location of this entity
//     var tr = new Ammo.btTransform();
//     tr.setIdentity();
//     var p = this.entity.getPosition();
//     tr.setOrigin(new Ammo.btVector3(p.x, p.y, p.z));



//     this.carChassis = this.localCreateRigidBody(this.CarMass, tr, compound);
//     this.carChassis.entity = this.entity;

//     // Create vehicle
//     var tuning = new Ammo.btVehicleTuning(); //https://pybullet.org/Bullet/phpBB3/viewtopic.php?t=3346
//     var vehicleRayCaster = new Ammo.btDefaultVehicleRaycaster(app.systems.rigidbody.dynamicsWorld);
//     this.vehicle = new Ammo.btRaycastVehicle(tuning, this.carChassis, vehicleRayCaster);

//     // Never deactivate the vehicle
//     this.carChassis.setActivationState(pc.RIGIDBODY_DISABLE_DEACTIVATION);

//     // Add the vehicle to the dynamics world
//     app.systems.rigidbody.dynamicsWorld.addAction(this.vehicle);

//     // Choose coordinate system
//     var rightIndex = 0; 
//     var upIndex = 1; 
//     var forwardIndex = 2;
//     this.vehicle.setCoordinateSystem(rightIndex, upIndex, forwardIndex);

//     // Add wheels to the vehicle
//     var name = this.entity.getName();
//     var numWheels = this.wheelsConfig.length;

//     var wheel;

//     for (i = 0; i < numWheels; i++) {
//         wheel = this.wheelsConfig[i];
//         var connectionPoint = new Ammo.btVector3(wheel.connection[0], wheel.connection[1], wheel.connection[2]);
//         this.vehicle.addWheel(connectionPoint, this.wheelDirection, this.wheelAxle, this.suspensionRestLength, wheel.radius, tuning, wheel.isFront);
//     }

//     // Set wheel params
//     for (i = 0; i < this.vehicle.getNumWheels(); i++) {
//         wheel = this.vehicle.getWheelInfo(i);
//         wheel.set_m_suspensionStiffness(this.suspensionStiffness);
//         wheel.set_m_wheelsDampingRelaxation(this.suspensionDamping);
//         wheel.set_m_wheelsDampingCompression(this.suspensionCompression);
//         wheel.set_m_frictionSlip(this.friction);
//         wheel.m_brake = this.WheelFrictionFactor;
//         wheel.set_m_rollInfluence(this.rollInfluence);
//     }

//     // Find the actual chassis and wheel models 
//     this.graphics.chassis = this.entity.findByName(this.ChassisName);


//     for (i = 0; i < this.vehicle.getNumWheels(); i++) {
//         this.graphics.wheels[i] = this.entity.findByName(this.wheelsConfig[i].name);
//     }

//     // Create the debug graphics for the car
//     if (this.DEBUG_DRAW) {
//         var e = new pc.Entity();
//         e.setLocalScale(1.8, 1, 3.5); // Double of the bullet vehicle size
//         app.root.addChild(e);
//         e.addComponent('model', {
//             type: 'box',
//             castShadows: true
//         });

//         this.debug.chassis = e;

//         for (i = 0; i < this.vehicle.getNumWheels(); i++) {
//             wheel = this.wheelsConfig[i];

//             p = new pc.Entity();
//             app.root.addChild(p);
//             this.debug.wheels.push(p);

//             e = new pc.Entity();
//             e.setLocalEulerAngles(0, 0, 90);
//             e.setLocalScale(wheel.radius / 0.5, wheel.width, wheel.radius / 0.5);
//             p.addChild(e);
//             e.addComponent('model', {
//                 type: 'cylinder',
//                 castShadows: true
//             });
//         }
//     }

//     this.entity.collision.on('triggerenter', this.onTriggerEnter, this);

//     // Set up the events
//     var self = this;
//     this.on("enable", this.onEnable);

//     this.on("disable", this.onDisable);

//     this.on("attr", this.onAttributeChanged);
//     this.onEnable();
// };


// // Resets the vehicle to its initial position
// Bike.prototype.reset = function () {
//     var body = this.carChassis;
//     var transform = body.getWorldTransform();
//     transform.setOrigin(new Ammo.btVector3(this.initialPos.x, this.initialPos.y, this.initialPos.z));
//     transform.setRotation(new Ammo.btQuaternion(this.initialRot.x, this.initialRot.y, this.initialRot.z, this.initialRot.w));
//     body.setLinearVelocity(new Ammo.btVector3(0, 0, 0));
//     body.setAngularVelocity(new Ammo.btVector3(0, 0, 0));
// };


// // Called when the vehicle is enabled
// Bike.prototype.onEnable = function () {
//     this.controls = true;
// };


// // Called when the vehicle is disabled
// Bike.prototype.onDisable = function () {
//     this.controls = false;
// };


// // Called when an attribute changes value in the Designer
// Bike.prototype.onAttributeChanged = function (name, oldValue, newValue) {
//     if (this.vehicle) {
//         // reset parameters on all wheels
//         for (var i = 0; i < this.vehicle.getNumWheels(); i++) {
//             var wheel = this.vehicle.getWheelInfo(i);
//             wheel.set_m_suspensionStiffness(this.suspensionStiffness);
//             wheel.set_m_wheelsDampingRelaxation(this.suspensionDamping);
//             wheel.set_m_wheelsDampingCompression(this.suspensionCompression);
//             wheel.set_m_frictionSlip(this.friction);
//             wheel.set_m_rollInfluence(this.rollInfluence);
//             wheel.m_brake = this.WheelFrictionFactor;
//             this.vehicle.updateWheelTransform(i, false);
//         }
//     }
// };

// // Called every frame
// Bike.prototype.update = function (dt) {    
//     var app = this.app;
//     var i;



//     // Reset the vehicle if R is pressed
//     if (app.keyboard.wasPressed(pc.KEY_R)) {
//         this.reset();
//     }

//     // Limit vehicle velocity
//     var maxVehicleSpeed = this.topSpeed;

//     this.topSpeed = parseFloat(this.TopSpeedSlider.script.slider.getValue());
//     this.maxSteering = parseFloat(this.SteeringSlider.script.slider.getValue());
//     this.maxEngineForce = parseFloat(this.EnginePowerSlider.script.slider.getValue());
//     this.brakingForce = parseFloat(this.BrakingPowerSlider.script.slider.getValue());

//     var spd = this.vehicle.getRigidBody().getLinearVelocity();
//     if (spd.length() > maxVehicleSpeed) {
//         var divisor = Math.abs(spd.length() / maxVehicleSpeed);
//         this.ammoVec.setValue(spd.x() / divisor, spd.y() / divisor, spd.z() / divisor);
//         this.vehicle.getRigidBody().setLinearVelocity(this.ammoVec);
//     }

//     this.direction.set(spd.x(), spd.y(), spd.z()).normalize();

//     // Get user input
//     var left = false;
//     var right = false;
//     var up = false;
//     var down = false;


//     if (this.controls) {
//         left = app.keyboard.isPressed(pc.KEY_A) || app.keyboard.isPressed(pc.KEY_LEFT) || leftPedal;
//         right = app.keyboard.isPressed(pc.KEY_D) || app.keyboard.isPressed(pc.KEY_RIGHT) || rightPedal;
//         up = app.keyboard.isPressed(pc.KEY_W) || app.keyboard.isPressed(pc.KEY_UP) || racePedal;
//         down = app.keyboard.isPressed(pc.KEY_S) || app.keyboard.isPressed(pc.KEY_DOWN) || brakePedal;
//     }

//     if (left && right) {
//         this.vehicleSteering = 0;
//     } else if (left) {
//         this.vehicleSteering = this.maxSteering;
//     } else if (right) {
//         this.vehicleSteering = -this.maxSteering;
//     } else {
//         this.vehicleSteering = 0;
//     }

//     if (up && down) {
//         this.engineForce = this.brakingForce = 0;
//     } else if (up) {
//         this.brakingForce = 0;
//         this.engineForce = this.maxEngineForce;
//     } else if (down) {
//         this.brakingForce = 0;
//         this.engineForce = -this.maxEngineForce;
//     } else { 
//         this.engineForce = 0;
//         this.brakingForce =0;
//     }

//     if(app.keyboard.isPressed(pc.KEY_B)){
//         this.brakingForce = this.maxBrakingForce;
//     }


//     // Apply engine and braking force to the back wheels
//     this.vehicle.applyEngineForce(this.engineForce, 2);
//     this.vehicle.setBrake(this.brakingForce, 2);
//     this.vehicle.applyEngineForce(this.engineForce, 3);
//     this.vehicle.setBrake(this.brakingForce, 3);
//     //this.vehicle.updateFriction(dt);

//     // Apply steering to the front wheels
//     this.vehicle.setSteeringValue(this.vehicleSteering, 0);
//     this.vehicle.setSteeringValue(this.vehicleSteering, 1);


//     for (i = 0; i < this.vehicle.getNumWheels(); i++) {
//         // synchronize the wheels with the (interpolated) chassis worldtransform
//         this.vehicle.updateWheelTransform(i, true);
//     }

//     // Get world transform of the chassis from the physics engine
//     this.carChassis.getMotionState().getWorldTransform(this.trans);
//     var t = this.trans;

//     var p = t.getOrigin();
//     var q = t.getRotation();
//     this.quat.set(q.x(), q.y(), q.z(), q.w());

//     // position debug shapes
//     if (this.DEBUG_DRAW) {
//         this.debug.chassis.setPosition(p.x(), p.y() + 1 , p.z());
//         this.debug.chassis.setRotation(this.quat);
//     }

//     // position chassis model
//     this.entity.setPosition(p.x(), p.y(), p.z());
//     this.entity.setRotation(this.quat);
//     this.graphics.chassis.setPosition(p.x(), p.y() , p.z());

//     // get chassis world transform we will use it to correct
//     // the wheel positions
//     this.mat.copy(this.graphics.chassis.getWorldTransform());
//     this.mat.invert();

//     for (i = 0; i < 4; i++) {
//         if(i === 0 || i === 2){
//             t = this.vehicle.getWheelTransformWS(i);

//             p = t.getOrigin();
//             q = t.getRotation();

//             this.pos.set(p.x(), p.y(), p.z());

//             this.quat.set(q.x(), q.y(), q.z(), q.w());


//             // convert world position to local position
//             this.mat.transformPoint(this.pos, this.pos);

//             // bring the wheel models a little further in
//             if(i === 0) // FRONT WHEELS
//             {
//                 this.pos.scale(110);
//                 this.pos.y *=+1.4;
//                 this.pos.x *= +0.1;
//                 this.pos.z *= 1.35;
//             }
//             else if(i === 2) // BACK WHEELS
//             {
//                 this.pos.scale(140);
//                 this.pos.y *= +1.5;
//                 this.pos.x *= +0.05;
//                 // this.pos.z *= 1.05;
//             }


//             this.graphics.wheels[i].setLocalPosition(this.pos);
//             this.graphics.wheels[i].setRotation(this.quat);

//             // position wheel debug shapes
//             if (this.DEBUG_DRAW) {
//                 this.debug.wheels[i].setPosition(p.x(), p.y(), p.z());
//                 this.debug.wheels[i].setRotation(this.quat);
//             }
//         }

//     }
// };

// Bike.prototype.getDistance = function (pos1, pos2) {
//     var x = pos1.x - pos2.x;
//     var y = pos1.y - pos2.y;
//     var z = pos1.z - pos2.z;

//     var temp = new pc.Vec3(x, y, z);
//     return temp.length();
// };

// Bike.prototype._Racing = function (event) {
//     racePedal = true;
// };

// Bike.prototype._Braking = function (event) {
//     brakePedal = true;
// };

// Bike.prototype._RacingEnd = function (event) {
//     racePedal = false;
// };

// Bike.prototype._BrakingEnd = function (event) {
//     brakePedal = false;
// };


// Bike.prototype._LeftSteer = function (event) {
//     leftPedal = true;
// };

// Bike.prototype._LeftSteerEnd = function (event) {
//     leftPedal = false;
// };

// Bike.prototype._RightSteer = function (event) {
//     rightPedal = true;
// };

// Bike.prototype._RightSteerEnd = function (event) {
//     rightPedal = false;
// };

// Bike.prototype.onTriggerEnter = function (entity) {
//     if(entity.tags.has("enemy")){
//         if(this.Health1.enabled){
//             this.Health1.enabled = false;
//         }
//         else if(this.Health2.enabled){
//             this.Health2.enabled = false;
//         }
//         else if(this.Health3.enabled){
//             this.Health3.enabled = false;
//         }
//     }
// };

var Follow=pc.createScript("follow");Follow.attributes.add("target",{type:"entity",title:"Target",description:"The Entity to follow"}),Follow.attributes.add("distance",{type:"number",default:4,title:"Distance",description:"How far from the Entity should the follower be"}),Follow.attributes.add("CameraXPosition",{type:"number",default:.2,title:"Camera X Position",description:"X position of the camera from target"}),Follow.attributes.add("CameraYPosition",{type:"number",default:2,title:"Camera Y Position",description:"Y position of the camera from target"}),Follow.attributes.add("CameraZPosition",{type:"number",default:5,title:"Camera Z Position",description:"Z position of the camera from target"}),Follow.attributes.add("CameraMoveSpeed",{type:"number",default:.2,title:"Camera Move Speed",description:"Speed of camera when it moves"}),Follow.prototype.setPlayerFillMode=function(){pc.platform.mobile&&(this.app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW),this.app.setCanvasResolution(pc.RESOLUTION_AUTO))},Follow.prototype.initialize=function(){this.setPlayerFillMode(),this.vec=new pc.Vec3(0,0,0)},Follow.prototype.update=function(t){if(this.target){var e=this.target.getPosition();e.x+=this.CameraXPosition*this.distance,e.y+=this.CameraYPosition*this.distance,e.z+=this.CameraZPosition*this.distance,this.vec.lerp(this.vec,e,this.CameraMoveSpeed),this.entity.setPosition(this.vec),this.entity.lookAt(this.target.getPosition())}};// BoxMover.js
// var BoxMover = pc.createScript('boxMover');

// // initialize code called once per entity
// BoxMover.prototype.initialize = function() {

// };

// // update code called every frame
// BoxMover.prototype.update = function(dt) {
//     if (this.app.keyboard.isPressed(pc.KEY_LEFT) ) {
//         //this.entity.rigidbody.applyForce(5000 *dt, 0, 0);
//         this.entity.translate(0.1, 0, 0);
//     }
//     if (this.app.keyboard.isPressed(pc.KEY_RIGHT) ) {
//        // this.entity.rigidbody.applyForce(-5000*dt, 0, 0);
//         this.entity.translate(-0.1, 0, 0);
//     }
    
//     if (this.app.keyboard.isPressed(pc.KEY_RIGHT) ) {
//        // this.entity.rigidbody.applyForce(-5000*dt, 0, 0);
//         this.entity.translate(-1, 0, 0);
//     }
// };

// swap method called for script hot-reloading
// inherit your script state here
// BoxMover.prototype.swap = function(old) { };

// to learn more about script anatomy, please read:
// http://developer.playcanvas.com/en/user-manual/scripting/

var LevelWinCollider,AllCoins,WinPoint,Minutes,Seconds,LevelManager,SelfLevel,LevelScript=pc.createScript("levelScript");LevelScript.attributes.add("LevelNumber",{type:"number",default:1}),LevelScript.attributes.add("xpos",{type:"number",default:5}),LevelScript.attributes.add("ypos",{type:"number",default:5}),LevelScript.attributes.add("zpos",{type:"number",default:5}),LevelScript.attributes.add("yrotpos",{type:"number",default:5}),LevelScript.attributes.add("WinCollider",{type:"entity",default:5}),LevelScript.attributes.add("Coins",{type:"entity",default:5}),LevelScript.attributes.add("parkingdirection2",{type:"number",default:-1}),LevelScript.attributes.add("WinPoint",{type:"entity"}),LevelScript.attributes.add("Minutes",{type:"number",default:1}),LevelScript.attributes.add("Seconds",{type:"number"}),LevelScript.attributes.add("CameraValue",{type:"entity"}),LevelScript.attributes.add("isMidPatchOn",{type:"number",default:0}),LevelScript.attributes.add("GameManagerRef",{type:"entity"}),LevelScript.attributes.add("isDebugging",{type:"boolean"}),LevelScript.attributes.add("SlidingGateReference",{type:"entity"}),LevelScript.prototype.LevelEssentials=function(){this.app.timeScale=1,tweenSpeed=1,LevelNumber=this.LevelNumber,this.SlidingGateReference&&(CANDEBUG&&console.log("inside slider"),SlidingGateRef=this.SlidingGateReference),spawnPos.x=this.xpos,spawnPos.y=this.ypos,spawnPos.z=this.zpos,yrotpos=this.yrotpos,LevelWinCollider=this.WinCollider,AllCoins=this.Coins,PD=parseInt(this.parkingdirection2),WinPoint=this.WinPoint,this.GameManagerRef.script.gameManager.ChangingLevel(),this.isDebugging?this.GameManagerRef.script.gameManager.DebugUpdateCameraTransform(this.CameraValue):this.GameManagerRef.script.gameManager.UpdateCameraTransform(this.CameraValue),1===this.isMidPatchOn?this.GameManagerRef.script.gameManager.ToggleEnvironmentPatch(!0):this.GameManagerRef.script.gameManager.ToggleEnvironmentPatch(!1),this.reverseParking=pc.app.root.findByName("ReverseParking"),Minutes=this.Minutes,Seconds=this.Seconds,this.GameManagerRef.script.gameManager.updatingTime(),this.GameManagerRef.script.gameManager.updatingPosition()},LevelScript.prototype.initialize=function(){LevelManager=this.app,SelfLevel=this,this.on("enable",this.LevelEssentials,this),this.LevelEssentials()},LevelScript.prototype.update=function(e){this.isDebugging&&this.GameManagerRef.script.gameManager.DebugUpdateCameraTransform(this.CameraValue)};var SELFLS,LevelSelection=pc.createScript("levelSelection"),LevelNumber=-1,isBtnPress=!1,isRestrictLevelsClick=!1,MyEnum={Level1:1,Level2:2,Level3:3,Level4:4,Level5:5,Level6:6,Level7:7,Level8:8,Level9:9,Level10:10,Level11:11,Level12:12,Level13:13,Level14:14,Level15:15,Level16:16,Level17:17,Level18:18,Level19:19,Level20:20,Level21:21,Level22:22,Level23:23,Level24:24,Level25:25,Level26:26,Level27:27,Level28:28,Level29:29,Level30:30,Level31:31,Level32:32,Level33:33,Level34:34,Level35:35,Level36:36,Level37:37,Level38:38,Level39:39,Level40:40,Level41:41,Level42:42,Level43:43,Level44:44,Level45:45,Level46:46,Level47:47,Level48:48,Level49:49,Level50:50,Level51:51,Level52:52,Level53:53,Level54:54,Level55:55,Level56:56,Level57:57,Level58:58,Level59:59,Level60:60,Level61:61,Level62:62,Level63:63,Level64:64,Level65:65,Level66:66,Level67:67,Level68:68,Level69:69,Level70:70,Level71:71,Level72:72,Level73:73,Level74:74,Level75:75,Level76:76,Level77:77,Level78:78,Level79:79,Level80:80,Level81:81,Level82:82,Level83:83,Level84:84,Level85:85,Level86:86,Level87:87,Level88:88,Level89:89,Level90:90,Level91:91,Level92:92,Level93:93,Level94:94,Level95:95,Level96:96,Level97:97,Level98:98,Level99:99,Level100:100,RestartBtn:103,TwitterShare:104,NextLevel:105,PlayBtn:106,HomeBtn:107,BackBtn:108};function mapEnum(e){var t={},n=[];for(var o in e)if(e.hasOwnProperty(o)){var a={};a[o]=e[o],n.push(a),t[e[o]]=o}return e.toString=function(e){return t[e]},n}LevelSelection.attributes.add("Choices",{type:"number",enum:mapEnum(MyEnum),default:MyEnum.Level1}),LevelSelection.attributes.add("SceneId",{type:"number",default:111111}),LevelSelection.attributes.add("IsLevelHandler",{type:"boolean",default:!1});var currentLevel,levelLocked=[],InitialLocked=[];LevelSelection.prototype.onButtonClick=function(){if(CANDEBUG&&console.log("level loaded called"),!0!==isBtnPress)switch(isBtnPress=!0,setTimeout(function(){isBtnPress=!1},600),this.Choices){case 1:this.LoadEnvironment(1,897545);break;case 2:this.LoadEnvironment(2,897545);break;case 3:this.LoadEnvironment(3,897545);break;case 4:this.LoadEnvironment(4,897545);break;case 5:this.LoadEnvironment(5,897545);break;case 6:this.LoadEnvironment(6,897545);break;case 7:this.LoadEnvironment(7,897545);break;case 8:this.LoadEnvironment(8,897545);break;case 9:this.LoadEnvironment(9,897545);break;case 10:this.LoadEnvironment(10,897545);break;case 11:this.LoadEnvironment(11,897548);break;case 12:this.LoadEnvironment(12,897548);break;case 13:this.LoadEnvironment(13,897548);break;case 14:this.LoadEnvironment(14,897548);break;case 15:this.LoadEnvironment(15,897548);break;case 16:this.LoadEnvironment(16,897548);break;case 17:this.LoadEnvironment(17,897548);break;case 18:this.LoadEnvironment(18,897548);break;case 19:this.LoadEnvironment(19,897548);break;case 20:this.LoadEnvironment(20,897548);break;case 21:this.LoadEnvironment(21,897554);break;case 22:this.LoadEnvironment(22,897554);break;case 23:this.LoadEnvironment(23,897554);break;case 24:this.LoadEnvironment(24,897554);break;case 25:this.LoadEnvironment(25,897554);break;case 26:this.LoadEnvironment(26,897554);break;case 27:this.LoadEnvironment(27,897554);break;case 28:this.LoadEnvironment(28,897554);break;case 29:this.LoadEnvironment(29,897554);break;case 30:this.LoadEnvironment(30,897554);break;case 31:this.LoadEnvironment(31,897552);break;case 32:this.LoadEnvironment(32,897552);break;case 33:this.LoadEnvironment(33,897552);break;case 34:this.LoadEnvironment(34,897552);break;case 35:this.LoadEnvironment(35,897552);break;case 36:this.LoadEnvironment(36,897552);break;case 37:this.LoadEnvironment(37,897552);break;case 38:this.LoadEnvironment(38,897552);break;case 39:this.LoadEnvironment(39,897552);break;case 40:this.LoadEnvironment(40,897552);break;case 41:this.LoadEnvironment(41,897549);break;case 42:this.LoadEnvironment(42,897549);break;case 43:this.LoadEnvironment(43,897549);break;case 44:this.LoadEnvironment(44,897549);break;case 45:this.LoadEnvironment(45,897549);break;case 46:this.LoadEnvironment(46,897549);break;case 47:this.LoadEnvironment(47,897549);break;case 48:this.LoadEnvironment(48,897549);break;case 49:this.LoadEnvironment(49,897549);break;case 50:this.LoadEnvironment(50,897549);break;case 51:this.LoadEnvironment(51,897547);break;case 52:this.LoadEnvironment(52,897547);break;case 53:this.LoadEnvironment(53,897547);break;case 54:this.LoadEnvironment(54,897547);break;case 55:this.LoadEnvironment(55,897547);break;case 56:this.LoadEnvironment(56,897547);break;case 57:this.LoadEnvironment(57,897547);break;case 58:this.LoadEnvironment(58,897547);break;case 59:this.LoadEnvironment(59,897547);break;case 60:this.LoadEnvironment(60,897547);break;case 61:this.LoadEnvironment(61,897546);break;case 62:this.LoadEnvironment(62,897546);break;case 63:this.LoadEnvironment(63,897546);break;case 64:this.LoadEnvironment(64,897546);break;case 65:this.LoadEnvironment(65,897546);break;case 66:this.LoadEnvironment(66,897546);break;case 67:this.LoadEnvironment(67,897546);break;case 68:this.LoadEnvironment(68,897546);break;case 69:this.LoadEnvironment(69,897546);break;case 70:this.LoadEnvironment(70,897546);break;case 71:this.LoadEnvironment(71,897555);break;case 72:this.LoadEnvironment(72,897555);break;case 73:this.LoadEnvironment(73,897555);break;case 74:this.LoadEnvironment(74,897555);break;case 75:this.LoadEnvironment(75,897555);break;case 76:this.LoadEnvironment(76,897555);break;case 77:this.LoadEnvironment(77,897555);break;case 78:this.LoadEnvironment(78,897555);break;case 79:this.LoadEnvironment(79,897555);break;case 80:this.LoadEnvironment(80,897555);break;case 81:this.LoadEnvironment(81,897553);break;case 82:this.LoadEnvironment(82,897553);break;case 83:this.LoadEnvironment(83,897553);break;case 84:this.LoadEnvironment(84,897553);break;case 85:this.LoadEnvironment(85,897553);break;case 86:this.LoadEnvironment(86,897553);break;case 87:this.LoadEnvironment(87,897553);break;case 88:this.LoadEnvironment(88,897553);break;case 89:this.LoadEnvironment(89,897553);break;case 90:this.LoadEnvironment(90,897553);break;case 91:this.LoadEnvironment(91,897551);break;case 92:this.LoadEnvironment(92,897551);break;case 93:this.LoadEnvironment(93,897551);break;case 94:this.LoadEnvironment(94,897551);break;case 95:this.LoadEnvironment(95,897551);break;case 96:this.LoadEnvironment(96,897551);break;case 97:this.LoadEnvironment(97,897551);break;case 98:this.LoadEnvironment(98,897551);break;case 99:this.LoadEnvironment(99,897551);break;case 100:this.LoadEnvironment(100,897551);break;case 103:this._restart(this.SceneId);break;case 106:this.Play_Btn();break;case 107:this.LoadLevel(897550);break;case 108:this.Back_Btn()}},LevelSelection.prototype.LoadFromStorage=function(e){levelLocked=this.getLocalStorageItem("levelLocked",!0)||e,this.setLocalStorageItem("levelLocked",levelLocked,!0)},LevelSelection.prototype.LoadLevelEssentials=function(){this.IsLevelHandler&&(currentLevel=parseInt(this.entity.tags.list()[0].split("_")[1]),InitialLocked=[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.LoadFromStorage(InitialLocked),0===levelLocked[currentLevel]?this.entity.children[1].enabled=!0:1===levelLocked[currentLevel]&&(this.entity.children[1].enabled=!1))},LevelSelection.prototype.getLocalStorageItem=function(e,t){return!1===useAPI?t?JSON.parse(localStorage.getItem(e)):localStorage.getItem(e):this.app.root.findByTag("API")[0].script.famobiApi.getFamobiLocalStorage(e,t)},LevelSelection.prototype.setLocalStorageItem=function(e,t,n){!1===useAPI?n?localStorage.setItem(e,JSON.stringify(t)):localStorage.setItem(e,t):this.app.root.findByTag("API")[0].script.famobiApi.setFamobiLocalStorage(e,t,n)},LevelSelection.prototype.LoadNextLevel=function(){CANDEBUG&&console.log("loaded next level")},LevelSelection.prototype._restart=function(e){var t=this.app.root.findByName("Root"),n=e+".json";setTimeout(function(){t.destroy(),SELFLS.app.loadSceneHierarchy(n,function(e,t){})},300)},LevelSelection.prototype.ShareTwitter=function(){window.open(pc.string.format("https://twitter.com/intent/tweet?text=Hey!%20Check%20out%20this%20cool%20game%20by%20@Famobize.%20Color%20Bump!%20https://playcanv.as/e/p/5Pp07I7b/",10))},LevelSelection.prototype.ShowLevelScreen=function(){var e=this.app.root.findByName("LevelSelection");e.enabled?e.enabled=!1:e.enabled=!0},LevelSelection.prototype.Play_Btn=function(){this.app.root.findByName("AllSounds").sound.slot("Tick").play(),this.mainMenu.enabled=!1,this.SelectionScreen.enabled=!0},LevelSelection.prototype.Back_Btn=function(){this.app.root.findByName("AllSounds").sound.slot("Tick").play(),this.SelectionScreen.enabled=!1,this.mainMenu.enabled=!0},LevelSelection.prototype.LoadLevel=function(e){isComingFromGamePlay=!0,this.app.root.findByName("AllSounds").sound.stop(),isGameOver=!1,isCountDownEnd=!1,isFirstTimeStore=!0;var t=this.app.root.findByName("Root"),n=e+".json";if(setTimeout(function(){t.destroy(),SELFLS.app.loadSceneHierarchy(n,function(e,t){e&&console.error(e)})},200),isPause){if(!0===useAPI)this.app.root.findByTag("API")[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!1,!0,!1,0,0);CANDEBUG&&console.log("Game resumed"),isPause=!1}if(!0===useAPI){var o=this.app.root.findByTag("API");o[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!0,"quit",!1,0,!1,0,!1,!1,!1,0,0),o[0].script.famobiApi.Register_famobi_tracking(!1,LevelNumber,!1,0,!0,!1)}CANDEBUG&&console.log("level "+LevelNumber+" quited")},LevelSelection.prototype.LoadEnvironment=function(e,t){if(CANDEBUG&&console.log("in loadEnvironment"),!1===isRestrictLevelsClick&&(isRestrictLevelsClick=!0,setTimeout(function(){isRestrictLevelsClick=!1},4e3),1===levelLocked[e-1])){if(CANDEBUG&&console.log("Load Level "+e+" "+t),this.currentSceneID=t,this.app.root.findByName("AllSounds").sound.slot("Tick").play(),isComingFromGamePlay=!1,LevelNumber=e,!0===useAPI){var n=this.app.root.findByTag("API");n[0].script.famobiApi.RegisterFamobiEvents(!0,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!1,!1,!1,0,0),n[0].script.famobiApi.Register_famobi_tracking(!0,LevelNumber,!1,0,!1,!1)}this.blankImage=pc.app.root.findByName("blankImage"),this.blankImage.enabled=!0,this.loader=pc.app.root.findByName("loader"),this.loader.enabled=!0,this.CheckAssetsLoaded()}},LevelSelection.prototype.CheckAssetsLoaded=function(){var e=this;!0===PropsLoaded&!0===ObsLoaded&&!0===BusesLoaded?e.LoadLevelCompletely():setTimeout(function(){e.CheckAssetsLoaded(),CANDEBUG&&console.log("checking again if assets are loaded....")},500)},LevelSelection.prototype.LoadLevelCompletely=function(){var e=this,t=this.app.root.findByName("Root"),n=this.currentSceneID+".json";setTimeout(function(){t.destroy(),e.app.loadSceneHierarchy(n,function(e,t){e&&console.error(e)})},1e3)},LevelSelection.prototype.initialize=function(){this.currentSceneID="emtp",this.LoadLevelEssentials(),this.on("enable",this.LoadLevelEssentials,this),this.pointerDown=!1;var e=/iPad|iPhone|iPod/.test(navigator.platform)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1;pc.platform.android||pc.platform.ios||pc.platform.mobile||e?(this.entity.element.on("touchstart",this.onPressedDown,this),this.entity.element.on("touchmove",this.onMove,this),this.entity.element.on("touchend",this.onRelease,this)):(this.entity.element.on("mousedown",this.onPressedDown,this),this.entity.element.on("mouseup",this.onRelease,this)),this.mainMenu=this.app.root.findByName("MainMenu"),this.SelectionScreen=this.app.root.findByName("SelectionScreen"),SELFLS=this},LevelSelection.prototype.onPressedDown=function(e){this.pointerDown=!0},LevelSelection.prototype.onMove=function(e){this.pointerDown=!1},LevelSelection.prototype.onRelease=function(e){this.pointerDown&&(this.onButtonClick(),this.pointerDown=!1)};var MainMenuScript=pc.createScript("mainMenuScript");MainMenuScript.prototype.initialize=function(){this.mainMenu=this.app.root.findByName("MainMenu"),this.SelectionScreen=this.app.root.findByName("SelectionScreen")},MainMenuScript.prototype.update=function(n){},MainMenuScript.prototype.Play_Btn=function(){this.mainMenu.enabled=!1,this.SelectionScreen.enabled=!0},MainMenuScript.prototype.Setting_Btn=function(){};pc.extend(pc,function(){var t=function(t){this._app=t,this._tweens=[],this._add=[]};t.prototype={add:function(t){return this._add.push(t),t},update:function(t){for(var i=0,e=this._tweens.length;i<e;)this._tweens[i].update(t)?i++:(this._tweens.splice(i,1),e--);this._add.length&&(this._tweens=this._tweens.concat(this._add),this._add.length=0)}};var i=function(t,i,e){pc.events.attach(this),this.manager=i,e&&(this.entity=null),this.time=0,this.complete=!1,this.playing=!1,this.stopped=!0,this.pending=!1,this.target=t,this.duration=0,this._currentDelay=0,this.timeScale=1,this._reverse=!1,this._delay=0,this._yoyo=!1,this._count=0,this._numRepeats=0,this._repeatDelay=0,this._from=!1,this._slerp=!1,this._fromQuat=new pc.Quat,this._toQuat=new pc.Quat,this._quat=new pc.Quat,this.easing=pc.EASE_LINEAR,this._sv={},this._ev={}};i.prototype={to:function(t,i,e,s,n,r){return t instanceof pc.Vec3?this._properties={x:t.x,y:t.y,z:t.z}:t instanceof pc.Color?(this._properties={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(this._properties.a=t.a)):this._properties=t,this.duration=i,e&&(this.easing=e),s&&this.delay(s),n&&this.repeat(n),r&&this.yoyo(r),this},from:function(t,i,e,s,n,r){return t instanceof pc.Vec3?this._properties={x:t.x,y:t.y,z:t.z}:t instanceof pc.Color?(this._properties={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(this._properties.a=t.a)):this._properties=t,this.duration=i,e&&(this.easing=e),s&&this.delay(s),n&&this.repeat(n),r&&this.yoyo(r),this._from=!0,this},rotate:function(t,i,e,s,n,r){return t instanceof pc.Quat?this._properties={x:t.x,y:t.y,z:t.z,w:t.w}:t instanceof pc.Vec3?this._properties={x:t.x,y:t.y,z:t.z}:t instanceof pc.Color?(this._properties={r:t.r,g:t.g,b:t.b},void 0!==t.a&&(this._properties.a=t.a)):this._properties=t,this.duration=i,e&&(this.easing=e),s&&this.delay(s),n&&this.repeat(n),r&&this.yoyo(r),this._slerp=!0,this},start:function(){if(this.playing=!0,this.complete=!1,this.stopped=!1,this._count=0,this.pending=this._delay>0,this._reverse&&!this.pending?this.time=this.duration:this.time=0,this._from){for(var t in this._properties)this._sv[t]=this._properties[t],this._ev[t]=this.target[t];if(this._slerp){this._toQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z);var i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,s=void 0!==this._properties.z?this._properties.z:this.target.z;this._fromQuat.setFromEulerAngles(i,e,s)}}else{for(var t in this._properties)this._sv[t]=this.target[t],this._ev[t]=this._properties[t];if(this._slerp){this._fromQuat.setFromEulerAngles(this.target.x,this.target.y,this.target.z);i=void 0!==this._properties.x?this._properties.x:this.target.x,e=void 0!==this._properties.y?this._properties.y:this.target.y,s=void 0!==this._properties.z?this._properties.z:this.target.z;this._toQuat.setFromEulerAngles(i,e,s)}}return this._currentDelay=this._delay,this.manager.add(this),this},pause:function(){this.playing=!1},resume:function(){this.playing=!0},stop:function(){this.playing=!1,this.stopped=!0},delay:function(t){return this._delay=t,this.pending=!0,this},repeat:function(t,i){return this._count=0,this._numRepeats=t,this._repeatDelay=i||0,this},loop:function(t){return t?(this._count=0,this._numRepeats=1/0):this._numRepeats=0,this},yoyo:function(t){return this._yoyo=t,this},reverse:function(){return this._reverse=!this._reverse,this},chain:function(){for(var t=arguments.length;t--;)t>0?arguments[t-1]._chained=arguments[t]:this._chained=arguments[t];return this},update:function(t){if(this.stopped)return!1;if(!this.playing)return!0;if(!this._reverse||this.pending?this.time+=t*this.timeScale:this.time-=t*this.timeScale,this.pending){if(!(this.time>this._currentDelay))return!0;this._reverse?this.time=this.duration-(this.time-this._currentDelay):this.time=this.time-this._currentDelay,this.pending=!1}var i=0;(!this._reverse&&this.time>this.duration||this._reverse&&this.time<0)&&(this._count++,this.complete=!0,this.playing=!1,this._reverse?(i=this.duration-this.time,this.time=0):(i=this.time-this.duration,this.time=this.duration));var e,s,n=this.time/this.duration,r=this.easing(n);for(var h in this._properties)e=this._sv[h],s=this._ev[h],this.target[h]=e+(s-e)*r;if(this._slerp&&this._quat.slerp(this._fromQuat,this._toQuat,r),this.entity&&(this.entity._dirtify(!0),this.element&&this.entity.element&&(this.entity.element[this.element]=this.target),this._slerp&&this.entity.setLocalRotation(this._quat)),this.fire("update",t),this.complete){var a=this._repeat(i);return a?this.fire("loop"):(this.fire("complete",i),this._chained&&this._chained.start()),a}return!0},_repeat:function(t){if(this._count<this._numRepeats){if(this._reverse?this.time=this.duration-t:this.time=t,this.complete=!1,this.playing=!0,this._currentDelay=this._repeatDelay,this.pending=!0,this._yoyo){for(var i in this._properties)tmp=this._sv[i],this._sv[i]=this._ev[i],this._ev[i]=tmp;this._slerp&&(this._quat.copy(this._fromQuat),this._fromQuat.copy(this._toQuat),this._toQuat.copy(this._quat))}return!0}return!1}};var e=function(t){return 1-s(1-t)},s=function(t){return t<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375};return{TweenManager:t,Tween:i,Linear:function(t){return t},QuadraticIn:function(t){return t*t},QuadraticOut:function(t){return t*(2-t)},QuadraticInOut:function(t){return(t*=2)<1?.5*t*t:-.5*(--t*(t-2)-1)},CubicIn:function(t){return t*t*t},CubicOut:function(t){return--t*t*t+1},CubicInOut:function(t){return(t*=2)<1?.5*t*t*t:.5*((t-=2)*t*t+2)},QuarticIn:function(t){return t*t*t*t},QuarticOut:function(t){return 1- --t*t*t*t},QuarticInOut:function(t){return(t*=2)<1?.5*t*t*t*t:-.5*((t-=2)*t*t*t-2)},QuinticIn:function(t){return t*t*t*t*t},QuinticOut:function(t){return--t*t*t*t*t+1},QuinticInOut:function(t){return(t*=2)<1?.5*t*t*t*t*t:.5*((t-=2)*t*t*t*t+2)},SineIn:function(t){return 0===t?0:1===t?1:1-Math.cos(t*Math.PI/2)},SineOut:function(t){return 0===t?0:1===t?1:Math.sin(t*Math.PI/2)},SineInOut:function(t){return 0===t?0:1===t?1:.5*(1-Math.cos(Math.PI*t))},ExponentialIn:function(t){return 0===t?0:Math.pow(1024,t-1)},ExponentialOut:function(t){return 1===t?1:1-Math.pow(2,-10*t)},ExponentialInOut:function(t){return 0===t?0:1===t?1:(t*=2)<1?.5*Math.pow(1024,t-1):.5*(2-Math.pow(2,-10*(t-1)))},CircularIn:function(t){return 1-Math.sqrt(1-t*t)},CircularOut:function(t){return Math.sqrt(1- --t*t)},CircularInOut:function(t){return(t*=2)<1?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},BackIn:function(t){return t*t*(2.70158*t-1.70158)},BackOut:function(t){return--t*t*(2.70158*t+1.70158)+1},BackInOut:function(t){var i=2.5949095;return(t*=2)<1?t*t*((i+1)*t-i)*.5:.5*((t-=2)*t*((i+1)*t+i)+2)},BounceIn:e,BounceOut:s,BounceInOut:function(t){return t<.5?.5*e(2*t):.5*s(2*t-1)+.5},ElasticIn:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),-e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4))},ElasticOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),e*Math.pow(2,-10*t)*Math.sin((t-i)*(2*Math.PI)/.4)+1)},ElasticInOut:function(t){var i,e=.1;return 0===t?0:1===t?1:(!e||e<1?(e=1,i=.1):i=.4*Math.asin(1/e)/(2*Math.PI),(t*=2)<1?e*Math.pow(2,10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*-.5:e*Math.pow(2,-10*(t-=1))*Math.sin((t-i)*(2*Math.PI)/.4)*.5+1)}}}()),function(){var t=pc.Application.getApplication();t&&(t._tweenManager=new pc.TweenManager(t),t.on("update",function(i){t._tweenManager.update(i)}),pc.Application.prototype.tween=function(t){return new pc.Tween(t,this._tweenManager)},pc.Entity.prototype.tween=function(t,i){var e=this._app.tween(t);return e.entity=this,this.on("destroy",function(){e.stop()}),i&&i.element&&(e.element=element),e})}();var TweenRotation=pc.createScript("tweenRotation");TweenRotation.attributes.add("duration",{type:"number",default:1}),TweenRotation.attributes.add("easing",{type:"string",default:"Linear"}),TweenRotation.attributes.add("delay",{type:"number",default:0}),TweenRotation.attributes.add("loop",{type:"boolean",default:!0}),TweenRotation.attributes.add("yoyo",{type:"boolean",default:!1}),TweenRotation.attributes.add("repeat",{type:"number",default:2}),TweenRotation.prototype.initialize=function(){this.reset(),this.on("attr:duration",function(t){this.tween.duration=t},this),this.on("attr:easing",this.reset,this),this.on("attr:delay",this.reset,this),this.on("attr:loop",this.reset,this),this.on("attr:yoyo",this.reset,this),this.on("attr:repeat",this.reset,this)},TweenRotation.prototype.reset=function(){this.tween&&this.tween.stop(),this.entity.setLocalEulerAngles(0,0,0),this.tween=this.entity.tween(this.entity.getLocalRotation()).rotate(new pc.Vec3(0,180,0),this.duration,pc[this.easing]).delay(this.delay).loop(this.loop).yoyo(this.yoyo),this.loop||this.tween.repeat(this.repeat),this.tween.start()};var PhysicsLayer=pc.createScript("physicslayer");PhysicsLayer.attributes.add("groupA",{type:"boolean",default:!1,title:"Group A"}),PhysicsLayer.attributes.add("groupB",{type:"boolean",default:!1,title:"Group B"}),PhysicsLayer.attributes.add("groupC",{type:"boolean",default:!1,title:"Group C"}),PhysicsLayer.attributes.add("groupD",{type:"boolean",default:!1,title:"Group D"}),PhysicsLayer.attributes.add("maskAll",{type:"boolean",default:!0,title:"Mask All"}),PhysicsLayer.attributes.add("maskA",{type:"boolean",default:!1,title:"Mask A"}),PhysicsLayer.attributes.add("maskB",{type:"boolean",default:!1,title:"Mask B"}),PhysicsLayer.attributes.add("maskC",{type:"boolean",default:!1,title:"Mask C"}),PhysicsLayer.attributes.add("maskD",{type:"boolean",default:!1,title:"Mask D"}),PhysicsLayer.prototype.initialize=function(){var t=this.entity.rigidbody;this.groupA&&(t.group|=pc.BODYGROUP_USER_1),this.groupB&&(t.group|=pc.BODYGROUP_USER_2),this.groupC&&(t.group|=pc.BODYGROUP_USER_3),this.groupD&&(t.group|=pc.BODYGROUP_USER_4),t.mask=pc.BODYGROUP_TRIGGER,this.maskAll&&(t.mask|=pc.BODYMASK_ALL),this.maskA&&(t.mask|=pc.BODYGROUP_USER_1),this.maskB&&(t.mask|=pc.BODYGROUP_USER_2),this.maskC&&(t.mask|=pc.BODYGROUP_USER_3),this.maskD&&(t.mask|=pc.BODYGROUP_USER_4)};var Rotate=pc.createScript("rotate");Rotate.attributes.add("cameraEntity",{type:"entity",title:"Camera Entity"}),Rotate.attributes.add("orbitSensitivity",{type:"number",default:.3,title:"Orbit Sensitivity",description:"How fast the camera moves around the orbit. Higher is faster"}),Rotate.prototype.initialize=function(){this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.onMouseMove,this),this.lastTouchPoint=new pc.Vec2,this.app.touch&&(this.app.touch.on(pc.EVENT_TOUCHSTART,this.onTouchStart,this),this.app.touch.on(pc.EVENT_TOUCHMOVE,this.onTouchMove,this))},Rotate.horizontalQuat=new pc.Quat,Rotate.verticalQuat=new pc.Quat,Rotate.resultQuat=new pc.Quat;var x=0;Rotate.prototype.update=function(){x+=10,this.entity.setLocalEulerAngles(0,0,x),CANDEBUG&&console.log(this.entity.getRotation()),x>=180&&(x=0)},Rotate.prototype.rotate=function(t,o){var e=Rotate.horizontalQuat,i=Rotate.verticalQuat;Rotate.resultQuat;e.setFromAxisAngle(this.cameraEntity.up,t*this.orbitSensitivity),i.setFromAxisAngle(this.cameraEntity.right,o*this.orbitSensitivity);var a=t*o,s=t+o;0!==s?a/=s:a=0,this.entity.rotateLocal(0,0,a),CANDEBUG&&console.log(this.entity.getRotation())},Rotate.prototype.onTouchStart=function(t){var o=t.touches[0];this.lastTouchPoint.set(o.x,o.y)},Rotate.prototype.onTouchMove=function(t){var o=t.touches[0],e=o.x-this.lastTouchPoint.x,i=o.y-this.lastTouchPoint.y;this.rotate(e,i),this.lastTouchPoint.set(o.x,o.y)},Rotate.prototype.onMouseMove=function(t){this.app.mouse.isPressed(pc.MOUSEBUTTON_LEFT)&&this.rotate(t.dx,t.dy)};var JoyStickLeft=pc.createScript("JoyStickLeft");JoyStickLeft.attributes.add("handle",{type:"entity",default:null,title:"Handle"}),JoyStickLeft.attributes.add("axis",{type:"string",default:"y",title:"Axis",description:"lock drag to axis: x, y or xy"}),JoyStickLeft.attributes.add("FirstPos",{type:"vec3"}),JoyStickLeft.attributes.add("Target",{type:"entity"}),JoyStickLeft.prototype.initialize=function(){this.FirstPos=this.entity.getLocalPosition()};var deltaTime=0;JoyStickLeft.prototype.postInitialize=function(){if(this.handle||(this.handle=this.entity.parent.findByName("JoyStickLeftHandle")),!this.handle)throw new Error("JoyStickLeft has no handle");this.addHandleListeners(),this.isDragging=!1,this.touchId=-1,this.mousePos=new pc.Vec3,this.anchorPos=this.handle.getLocalPosition().clone(),this.screen=this.getUIScreenComponent()},JoyStickLeft.prototype.getUIScreenComponent=function(){return this.handle.element.screen.screen},JoyStickLeft.prototype.addHandleListeners=function(){this.handle.element.useInput=!0,this.handle.element.on(pc.EVENT_MOUSEDOWN,this.onPressDown,this),this.app.mouse.on(pc.EVENT_MOUSEUP,this.onPressUp,this),this.app.mouse.on(pc.EVENT_MOUSEMOVE,this.onPressMove,this),this.app.touch&&(CANDEBUG&&console.log("initing touches"),this.handle.element.on(pc.EVENT_TOUCHSTART,this.onTouchStart,this),this.app.touch.on(pc.EVENT_TOUCHEND,this.onTouchEnd,this),this.app.touch.on(pc.EVENT_TOUCHCANCEL,this.onTouchEnd,this),this.app.touch.on(pc.EVENT_TOUCHMOVE,this.onTouchMove,this)),this.on("destroy",function(){this.handle.element.off(pc.EVENT_MOUSEDOWN,this.onPressDown,this),this.app.mouse.off(pc.EVENT_MOUSEUP,this.onPressUp,this),this.app.mouse.off(pc.EVENT_MOUSEMOVE,this.onPressMove,this),this.app.touch&&(this.handle.element.off(pc.EVENT_TOUCHSTART,this.onTouchStart,this),this.app.touch.off(pc.EVENT_TOUCHEND,this.onTouchEnd,this),this.app.touch.off(pc.EVENT_TOUCHCANCEL,this.onTouchEnd,this),this.app.touch.off(pc.EVENT_TOUCHMOVE,this.onTouchMove,this))})},JoyStickLeft.prototype.onTouchStart=function(t){var e=t.changedTouches[0];this.touchId=e.identifier,this.startDrag(t.x,t.y),t.event.stopPropagation()},JoyStickLeft.prototype.onTouchMove=function(t){for(var e=0;e<t.changedTouches.length;e++){var o=t.changedTouches[e];if(o.id==this.touchId)return t.event.stopPropagation(),void this.updateMove(o.x,o.y)}},JoyStickLeft.prototype.onTouchEnd=function(t){for(var e=0;e<t.changedTouches.length;e++){var o=t.changedTouches[e];if(o.id==this.touchId)return t.event.stopImmediatePropagation(),this.touchId=-1,void this.endDrag(o.x,o.y)}},JoyStickLeft.prototype.onPressDown=function(t){t.event.stopImmediatePropagation(),this.startDrag(t.x,t.y)},JoyStickLeft.prototype.onPressUp=function(t){t.event.stopImmediatePropagation(),this.endDrag(t.x,t.y)},JoyStickLeft.prototype.onPressMove=function(t){this.updateMove(t.x,t.y),t.event.stopImmediatePropagation()},JoyStickLeft.prototype.startDrag=function(t,e){this.isDragging=!0,this.setMouseXY(t,e)},JoyStickLeft.prototype.updateMove=function(t,e){this.isDragging&&this.setMouseXY(t,e)},JoyStickLeft.prototype.endDrag=function(t,e){this.isDragging=!1,this.setMouseXY(t,e)},JoyStickLeft.prototype.setMouseXY=function(t,e){this.mousePos.x=t,this.mousePos.y=e},JoyStickLeft.prototype.update=function(t){deltaTime=t,this.updateDrag()};var cursorPosition=new pc.Vec3(0,0,0);JoyStickLeft.prototype.LimitInCircle=function(t,e,o){var i=new pc.Vec3(0,0,0),s=(i=i.sub2(t,e)).length(),n=new pc.Vec3(0,0,0);return n=i.scale(1/s),cursorPosition=s>o?cursorPosition.add2(e,n.scale(o)):t},JoyStickLeft.prototype.Horizontal=function(t){return new pc.Vec3(1,0,0).mul(t)},JoyStickLeft.prototype.Vertical=function(t){return new pc.Vec3(0,1,0).mul(t)},JoyStickLeft.prototype.updateDrag=function(){if(this.isDragging){var t=this.app.graphicsDevice,e=this.handle.element.anchor.x*t.width,o=this.handle.element.anchor.y*t.height,i=1/this.screen.scale,s="x"==this.axis||"xy"==this.axis?(this.mousePos.x-e)*i:this.anchorPos.x,n="y"==this.axis||"xy"==this.axis?(-this.mousePos.y+o)*i:this.anchorPos.y,h=this.LimitInCircle(new pc.Vec3(s,n,0),this.FirstPos,110),c=new pc.Vec3(0,0,0),a=(c=c.sub2(this.Horizontal(this.FirstPos),this.Horizontal(h))).length()/110,r=new pc.Vec3(0,0,0),p=(r=r.sub2(this.Vertical(this.FirstPos),this.Vertical(h))).length()/110;h.x<this.FirstPos.x&&(a*=-1),h.y<this.FirstPos.y&&(p*=-1);var u=Math.atan2(p,a)*(180/3.14);this.Target.getEulerAngles();this.Target.setEulerAngles(0,0,u),this.handle.setLocalPosition(h)}};// joyStick.js
// var JoyStickLeft = pc.createScript('joyStick');

// JoyStickLeft.attributes.add('handle', {type: 'entity', default: null, title: 'Handle'});
// JoyStickLeft.attributes.add('axis', {type: 'string', default: "y", title: 'Axis', description: 'lock drag to axis: x, y or xy'});

// JoyStickLeft.attributes.add('FirstPos',{type:'vec3'});
// JoyStickLeft.attributes.add('Target',{type:'entity'});

// JoyStickLeft.prototype.initialize = function() {
//     this.FirstPos = this.entity.getLocalPosition();
//     //tempangle = this.Target.getEulerAngles();
//     this.angle = this.Target.getEulerAngles();
//     this.oldmousePos = new pc.Vec3();
//     this.ispos = false;
//     this.isWheelComplete =false;

//     this.l = 0.1;

// };

// var deltaTime = 0;
// var isLerpWheel = false;
// var tempangle = 0;
// var oldvert = 0;
// var oldhor = 0;

// JoyStickLeft.prototype.postInitialize = function() {


//     if( ! this.handle ) this.handle = this.entity.parent.findByName("JoyStickLeftHandle");

//     if( this.handle ) this.addHandleListeners();
//     else throw new Error( "JoyStickLeft has no handle" );

//     this.isDragging = false;
//     this.touchId = -1;

//     this.mousePos = new pc.Vec3();

//     this.anchorPos = this.handle.getLocalPosition().clone();

//     this.screen = this.getUIScreenComponent();

// };

// JoyStickLeft.prototype.getUIScreenComponent = function() {
//     return this.handle.element.screen.screen;
// };

// JoyStickLeft.prototype.addHandleListeners = function() {

//     this.handle.element.useInput = true;

//     this.handle.element.on(pc.EVENT_MOUSEDOWN, this.onPressDown, this);
//     this.app.mouse.on(pc.EVENT_MOUSEUP, this.onPressUp, this);
//     this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onPressMove, this);

//     if( this.app.touch )
//     {
//         if(CANDEBUG)
//             console.log("initing touches");

//         this.handle.element.on(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
//         this.app.touch.on(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
//         this.app.touch.on(pc.EVENT_TOUCHCANCEL, this.onTouchEnd, this);
//         this.app.touch.on(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
//     }    

//     this.on('destroy', function() {

//         this.handle.element.off(pc.EVENT_MOUSEDOWN, this.onPressDown, this);
//         this.app.mouse.off(pc.EVENT_MOUSEUP, this.onPressUp, this);
//         this.app.mouse.off(pc.EVENT_MOUSEMOVE, this.onPressMove, this);

//         if( this.app.touch )
//         {
//             this.handle.element.off(pc.EVENT_TOUCHSTART, this.onTouchStart, this);
//             this.app.touch.off(pc.EVENT_TOUCHEND, this.onTouchEnd, this);
//             this.app.touch.off(pc.EVENT_TOUCHCANCEL, this.onTouchEnd, this);
//             this.app.touch.off(pc.EVENT_TOUCHMOVE, this.onTouchMove, this);
//         }
//     });

// };

// JoyStickLeft.prototype.onTouchStart = function(ev) {
//     var touch = ev.changedTouches[0];
//     this.touchId = touch.identifier;
//     this.startDrag( ev.x, ev.y );
//     ev.event.stopPropagation();
// };
// JoyStickLeft.prototype.onTouchMove = function(ev) {
//     for(var i=0; i< ev.changedTouches.length; i++ ) 
//     {
//         var t = ev.changedTouches[i];
//         if( t.id == this.touchId )
//         {
//             ev.event.stopPropagation();
//             this.updateMove( t.x, t.y );
//             return;
//         }
//     }
// };
// JoyStickLeft.prototype.onTouchEnd = function(ev) {
//     for(var i=0; i< ev.changedTouches.length; i++ ) 
//     {
//         var t = ev.changedTouches[i];
//         if( t.id == this.touchId )
//         {
//             ev.event.stopImmediatePropagation();
//             this.touchId = -1;
//             this.endDrag( t.x, t.y );
//             return;
//         }
//     }
// };


// JoyStickLeft.prototype.onPressDown = function(ev) {
//     ev.event.stopImmediatePropagation();
//     this.startDrag(ev.x,ev.y);
// };
// JoyStickLeft.prototype.onPressUp = function(ev) {
//     ev.event.stopImmediatePropagation();
//     this.endDrag(ev.x,ev.y);
//     this.Target.setEulerAngles(0,0,0);
//     tempangle = 0;
//     // this.handle.setLocalPosition(-470.889, -174.482, 0);
// };
// JoyStickLeft.prototype.onPressMove = function(ev) {
//     this.updateMove(ev.x,ev.y);
//     ev.event.stopImmediatePropagation();
// };

// JoyStickLeft.prototype.startDrag = function(x,y) {
//     this.isDragging = true;
//     //this.setMouseXY(x,y);
// };
// JoyStickLeft.prototype.updateMove = function(x,y) {
//     if( this.isDragging ) this.setMouseXY(x,y);
// };
// JoyStickLeft.prototype.endDrag = function(x,y) {
//     this.isDragging = false;
//     this.setMouseXY(x,y);
// };
// JoyStickLeft.prototype.setMouseXY = function(x,y) {
//     if(this.ispos === false)
//     {
//         this.oldmousePos.x = x;
//         this.oldmousePos.y = y; 
//         this.ispos =true;
//     }
//     this.mousePos.x = x;
//     this.mousePos.y = y;
// };

// JoyStickLeft.prototype.update = function(dt) {
//     deltaTime = dt;
//     this.updateDrag();
//     if(isLerpWheel === true)
//     {
//         //s. = pc.math.lerp(this.vehicleSteering,0,0.05);
//     }

// };

// var cursorPosition = new pc.Vec3(0,0,0);

// JoyStickLeft.prototype.LimitInCircle = function(mousePosition,center,maxLength){



//     var diff = new pc.Vec3(0,0,0);
//     diff = diff.sub2(mousePosition,center);

//     var distance = diff.length();
//     var rate = new pc.Vec3(0,0,0);
//     rate = diff.scale(1/distance);

//     if (distance > maxLength) {
//         cursorPosition = cursorPosition.add2(center,rate.scale(maxLength));

//     } else {
//         cursorPosition = mousePosition;
//     }

//     return cursorPosition;
// };

// JoyStickLeft.prototype.Horizontal = function(vector){
//     var result = new pc.Vec3(1,0,0).mul(vector);
//     return result;  
// };

// JoyStickLeft.prototype.Vertical = function(vector){
//     var result = new pc.Vec3(0,1,0).mul(vector);
//     return result;  
// };

// JoyStickLeft.prototype.updateDrag = function() {


//     if( ! this.isDragging ) return ;    

//     var device = this.app.graphicsDevice;
//     var xOffs = this.handle.element.anchor.x*device.width;
//     var yOffs = this.handle.element.anchor.y*device.height;
//     var scale = 1/this.screen.scale;

//     var screenX = (this.axis == 'x' || this.axis == 'xy') ? (this.mousePos.x-xOffs)*scale : this.anchorPos.x ;
//     var screenY = (this.axis == 'y' || this.axis == 'xy') ? (-this.mousePos.y+yOffs)*scale  : this.anchorPos.y ;

//     var limit = this.LimitInCircle(new pc.Vec3(screenX,screenY,0),this.FirstPos,110);

//     var XdeltaPos = new pc.Vec3(0,0,0);
//     XdeltaPos = XdeltaPos.sub2(this.Horizontal(this.FirstPos),this.Horizontal(limit));
//     var horizontal = XdeltaPos.length()/110;

//     var YdeltaPos = new pc.Vec3(0,0,0);
//     YdeltaPos = YdeltaPos.sub2(this.Vertical(this.FirstPos),this.Vertical(limit));
//     var vertical = YdeltaPos.length()/110;

//     //     var vertical = this.Vertical(this.entity.getPosition()).sub(this.Vertical(limit)).length()/110;
//     if(limit.x < this.FirstPos.x){
//         horizontal *= -1;
//     }
//     if(limit.y < this.FirstPos.y){
//         vertical *= -1;
//     }

//     var myangle = Math.atan2(vertical,horizontal) * (360 / 6.28);
//     //     if(myangle > 1 && myangle < 5)
//     //     {
//     //         isWheelComplete = true;
//     //         return;

//     //     }
//     //     if(myangle < 1)
//     //     {
//     //         if(isWheelComplete)
//     //         {
//     //             return;
//     //         }
//     //     }
//     //     else if(myangle > 5)
//     //     {
//     //         isWheelComplete = false;
//     //     }
//     var angle = this.Target.getEulerAngles();
//     this.Target.setEulerAngles(0,0,myangle);  
//     //tempangle = tempangle + 0.1;
//     //     if(this.mousePos.x == this.oldmousePos.x && this.mousePos.y == this.oldmousePos.y){
//     //         return;
//     //     }
//     //     if(vertical < oldvert)
//     //     {
//     //         if(horizontal < oldhor){
//     //             if(vertical >0 && horizontal < 0){
//     //                 tempangle = tempangle + this.l;
//     //             }
//     //             else{
//     //                 tempangle = tempangle - this.l;
//     //             }
//     //         }
//     //         else if(horizontal > oldhor)
//     //         {
//     //             if(vertical < 0 && horizontal < 0){
//     //                 tempangle = tempangle + this.l;
//     //             }
//     //             else{
//     //                 tempangle = tempangle - this.l;
//     //             }
//     //         }
//     //     }
//     //     else if(vertical > oldvert){
//     //         if(horizontal < oldhor){
//     //             if(vertical > 0 && horizontal > 0){
//     //                 tempangle = tempangle + this.l;
//     //             }
//     //             else{
//     //                 tempangle = tempangle - this.l;
//     //             }
//     //         }
//     //         else if(horizontal > oldhor){
//     //             if(vertical < 0 && horizontal > 0){
//     //                 tempangle = tempangle + this.l;
//     //             }
//     //             else{
//     //                 tempangle = tempangle - this.l;
//     //             }
//     //         }
//     //     }

//     //    // tempangle = tempangle - this.l;
//     //     //this.Target.setEulerAngles(0,0,myangle);
//     //     this.oldmousePos.x = this.mousePos.x;
//     //     this.oldmousePos.y = this.mousePos.y;



//     //     var finalVector = new pc.Vec2(horizontal,vertical);
//     //this.handle.setLocalPosition(limit);
// };


var DynamicBatching=pc.createScript("dynamicBatching");DynamicBatching.prototype.initialize=function(){this.buildings=this.app.batcher.addGroup("CubesGroup",!1,20)},DynamicBatching.prototype.update=function(i){};var TweenPosition=pc.createScript("tweenPosition");TweenPosition.prototype.initialize=function(){this.entity.tween(this.entity.getLocalPosition()).to(new pc.Vec3(4.335,2.5,-4.216),2,pc.Linear).loop(!0).yoyo(!0).start()},TweenPosition.prototype.update=function(t){};var self,arrow33,arrow22,arrow11,arrow1,arrow2,arrow3,SignTween=pc.createScript("signTween");SignTween.attributes.add("arrow1",{type:"entity"}),SignTween.attributes.add("arrow2",{type:"entity"}),SignTween.attributes.add("arrow3",{type:"entity"}),SignTween.attributes.add("arrow11",{type:"entity"}),SignTween.attributes.add("arrow22",{type:"entity"}),SignTween.attributes.add("arrow33",{type:"entity"}),SignTween.prototype.initialize=function(){self=this,this.timer=0},SignTween.prototype.update=function(e){this.timer+=e,this.temp=Math.round(this.timer),this.temp>=2&&(this.MovingSign(),this.timer=0)},SignTween.prototype.MovingSign=function(){var e=this.arrow33,t=this.arrow22,n=this.arrow11,a=this.arrow1,i=this.arrow2,r=this.arrow3;setTimeout(function(){e.enabled=!1,t.enabled=!1,n.enabled=!1,r.enabled=!0,i.enabled=!0,a.enabled=!0,setTimeout(function(){r.enabled=!1,i.enabled=!1,a.enabled=!1,e.enabled=!0,t.enabled=!0,n.enabled=!0},1e3)},1e3)},SignTween.prototype.Msign=function(){var e=this.arrow33,t=this.arrow22,n=this.arrow11,a=this.arrow1,i=this.arrow2,r=this.arrow3;self.arrow1.enabled=!0,setTimeout(function(){e.enabled=!1,r.enabled=!0,setTimeout(function(){r.enabled=!1,e.enabled=!0,t.enabled=!1,i.enabled=!0,setTimeout(function(){i.enabled=!1,t.enabled=!0,n.enabled=!1,a.enabled=!0,setTimeout(function(){a.enabled=!1,n.enabled=!0},200)},200)},200)},200)},SignTween.prototype.changeToNextMaterial=function(){for(var e=this.textures[0].resource,t=this.arrow33.model.meshInstances,n=0;n<t.length;++n){var a=t[n];a.material.diffuseMap=e,a.material.update()}};var FadingObject=pc.createScript("fadingObject");FadingObject.attributes.add("duration",{type:"number",default:2,title:"Duration (Secs)"}),FadingObject.prototype.initialize=function(){this.time=0},FadingObject.prototype.update=function(t){this.time+=t,this.time>this.duration&&(this.time-=this.duration);for(var i=this.time/this.duration,e=Math.abs(2*(i-.5)),a=this.entity.model.meshInstances,n=0;n<a.length;++n)a[n].setParameter("material_opacity",e)};var MusicVal,SoundVal,LevelBlack=pc.createScript("levelBlack");LevelBlack.attributes.add("BlankImage",{type:"entity"}),LevelBlack.attributes.add("musicMuteBtn",{type:"entity"}),LevelBlack.attributes.add("musicUnMuteBtn",{type:"entity"}),LevelBlack.attributes.add("soundMuteBtn",{type:"entity"}),LevelBlack.attributes.add("soundUnMuteBtn",{type:"entity"}),LevelBlack.prototype.Levelblacked=function(){this.mainMenu=this.app.root.findByName("MainMenu"),this.SelectionScreen=this.app.root.findByName("SelectionScreen"),this.soundManager=this.app.root.findByName("AllSounds"),this.musicManager=this.app.root.findByName("MusicManager"),MusicVal=this.getLocalStorageItem("Music",!1)||1,this.setLocalStorageItem("Music",MusicVal,!1),"0"===MusicVal?(this.musicManager.sound.volume=0,this.musicUnMuteBtn.enabled=!0,this.musicMuteBtn.enabled=!1):(this.musicManager.sound.volume=1,this.musicMuteBtn.enabled=!0,this.musicUnMuteBtn.enabled=!1),SoundVal=this.getLocalStorageItem("Sound",!1)||1,this.setLocalStorageItem("Sound",SoundVal,!1),"0"===SoundVal?(this.soundUnMuteBtn.enabled=!0,this.soundMuteBtn.enabled=!1,this.soundManager.sound.volume=0):(this.soundManager.sound.volume=1,this.soundUnMuteBtn.enabled=!1,this.soundMuteBtn.enabled=!0);var t=/iPad|iPhone|iPod/.test(navigator.platform)||"MacIntel"===navigator.platform&&navigator.maxTouchPoints>1;pc.platform.android||pc.platform.ios||pc.platform.mobile||t?(this.soundMuteBtn.element.on("touchend",this.OnMuteSoundBtn,this),this.soundUnMuteBtn.element.on("touchend",this.OnUnMuteSoundBtn,this),this.musicMuteBtn.element.on("touchend",this.OnMuteMusicBtn,this),this.musicUnMuteBtn.element.on("touchend",this.OnUnMuteMusicBtn,this)):(this.soundMuteBtn.element.on("mouseup",this.OnMuteSoundBtn,this),this.soundUnMuteBtn.element.on("mouseup",this.OnUnMuteSoundBtn,this),this.musicMuteBtn.element.on("mouseup",this.OnMuteMusicBtn,this),this.musicUnMuteBtn.element.on("mouseup",this.OnUnMuteMusicBtn,this)),this.BlankImage.enabled=!1},LevelBlack.prototype.initialize=function(){this.on("enable",this.Levelblacked,this),this.Levelblacked()},LevelBlack.prototype.update=function(t){!0===isComingFromGamePlay&&(isComingFromGamePlay=!1,this.mainMenu.enabled=!1,this.SelectionScreen.enabled=!0)},LevelBlack.prototype.OnMuteMusicBtn=function(){(this.musicManager.sound.volume=0,this.musicUnMuteBtn.enabled=!0,this.musicMuteBtn.enabled=!1,this.setLocalStorageItem("Music",0,!1),!0===useAPI)&&this.app.root.findByTag("API")[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!1,!1,!0,parseFloat(this.getLocalStorageItem("Music",!1)),parseFloat(this.getLocalStorageItem("Sound",!1)));CANDEBUG&&console.log("Music Tweaked "+this.getLocalStorageItem("Music",!1))},LevelBlack.prototype.OnMuteSoundBtn=function(){(this.soundManager.sound.volume=0,this.soundUnMuteBtn.enabled=!0,this.soundMuteBtn.enabled=!1,this.setLocalStorageItem("Sound",0,!1),!0===useAPI)&&this.app.root.findByTag("API")[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!1,!1,!0,parseFloat(this.getLocalStorageItem("Music",!1)),parseFloat(this.getLocalStorageItem("Sound",!1)));CANDEBUG&&console.log("Sound Tweaked "+this.getLocalStorageItem("Sound",!1))},LevelBlack.prototype.OnUnMuteMusicBtn=function(){(this.musicManager.sound.volume=1,this.musicUnMuteBtn.enabled=!1,this.musicMuteBtn.enabled=!0,this.setLocalStorageItem("Music",1,!1),!0===useAPI)&&this.app.root.findByTag("API")[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!1,!1,!0,parseFloat(this.getLocalStorageItem("Music",!1)),parseFloat(this.getLocalStorageItem("Sound",!1)));CANDEBUG&&console.log("Music Tweaked "+this.getLocalStorageItem("Music",!1))},LevelBlack.prototype.OnUnMuteSoundBtn=function(){(this.soundManager.sound.volume=1,this.soundUnMuteBtn.enabled=!1,this.soundMuteBtn.enabled=!0,this.setLocalStorageItem("Sound",1,!1),!0===useAPI)&&this.app.root.findByTag("API")[0].script.famobiApi.RegisterFamobiEvents(!1,LevelNumber.toString(),!1,!1,!1,"none",!1,0,!1,0,!1,!1,!0,parseFloat(this.getLocalStorageItem("Music",!1)),parseFloat(this.getLocalStorageItem("Sound",!1)));CANDEBUG&&console.log("Sound Tweaked "+this.getLocalStorageItem("Sound",!1))},LevelBlack.prototype.getLocalStorageItem=function(t,e){return!1===useAPI?e?JSON.parse(localStorage.getItem(t)):localStorage.getItem(t):this.app.root.findByTag("API")[0].script.famobiApi.getFamobiLocalStorage(t,e)},LevelBlack.prototype.setLocalStorageItem=function(t,e,n){!1===useAPI?n?localStorage.setItem(t,JSON.stringify(e)):localStorage.setItem(t,e):this.app.root.findByTag("API")[0].script.famobiApi.setFamobiLocalStorage(t,e,n)};var RotateLoader=pc.createScript("rotateLoader");RotateLoader.prototype.initialize=function(){},RotateLoader.prototype.update=function(t){this.entity.rotateLocal(0,0,-120*t)};var BusSelectionHandler=pc.createScript("busSelectionHandler");BusSelectionHandler.attributes.add("BusesImages",{type:"entity",array:!0}),BusSelectionHandler.attributes.add("BusSelectButtons",{type:"entity",array:!0}),BusSelectionHandler.attributes.add("StateButton",{type:"entity"}),BusSelectionHandler.attributes.add("BusGroups",{type:"entity",array:!0}),BusSelectionHandler.attributes.add("NavigationButtons",{type:"entity",array:!0}),BusSelectionHandler.attributes.add("BusPrices",{type:"number",array:!0}),BusSelectionHandler.attributes.add("StoreScreen",{type:"entity"}),BusSelectionHandler.attributes.add("MainMenuScreen",{type:"entity"}),BusSelectionHandler.attributes.add("StoreButton",{type:"entity"}),BusSelectionHandler.attributes.add("StoreBackButton",{type:"entity"}),BusSelectionHandler.attributes.add("coinsReference",{type:"entity"}),BusSelectionHandler.attributes.add("ToastReference",{type:"entity"}),BusSelectionHandler.attributes.add("SelectBtn",{type:"entity"}),BusSelectionHandler.attributes.add("SelectedBtn",{type:"entity"}),BusSelectionHandler.attributes.add("isInMainScene",{type:"number",default:1});var TotalCurrency,total_buses_purchased_ever,busBought=[],isFirstTimeStore=!0,previousBusUsing=null,busUsing=null,isLocked=[0,0,0,0,0,0,0,0,0];BusSelectionHandler.prototype.initialize=function(){this.tempSelected=0,this.tempNavigation=0,this.tempToggleBus=0,this.navigationUsed=!1,this.tempBusSelected=0,this.pressedDown=!1,this.StoreButton.element.on("mouseup",this.OpenStore,this),this.StoreButton.element.on("mousedown",this.OnPressedDown,this),this.StoreButton.element.on(pc.EVENT_TOUCHSTART,this.OnPressedDown,this),this.StoreButton.element.on(pc.EVENT_TOUCHEND,this.OpenStore,this),this.StoreBackButton.element.on("mouseup",this.CloseStore,this),this.StoreBackButton.element.on("mousedown",this.OnPressedDown,this),this.StoreBackButton.element.on(pc.EVENT_TOUCHSTART,this.OnPressedDown,this),this.StoreBackButton.element.on(pc.EVENT_TOUCHEND,this.CloseStore,this),this.StateButton.element.on("mouseup",this.stateButtonPressed,this),this.StateButton.element.on("mousedown",this.OnPressedDown,this),this.StateButton.element.on(pc.EVENT_TOUCHSTART,this.OnPressedDown,this),this.StateButton.element.on(pc.EVENT_TOUCHEND,this.stateButtonPressed,this),this.SelectBtn.element.on("mouseup",this.stateButtonPressed,this),this.SelectBtn.element.on("mousedown",this.OnPressedDown,this),this.SelectBtn.element.on(pc.EVENT_TOUCHSTART,this.OnPressedDown,this),this.SelectBtn.element.on(pc.EVENT_TOUCHEND,this.stateButtonPressed,this);for(var e=0;e<this.BusSelectButtons.length;e++)this.BusSelectButtons[e].element.on("mouseup",this.selectBus,this),this.BusSelectButtons[e].element.on("mousedown",this.OnPressedDown,this),this.BusSelectButtons[e].element.on(pc.EVENT_TOUCHSTART,this.OnPressedDown,this),this.BusSelectButtons[e].element.on(pc.EVENT_TOUCHEND,this.selectBus,this);for(var t=0;t<this.NavigationButtons.length;t++)this.NavigationButtons[t].element.on("mouseup",this.OnToggleBus,this),this.NavigationButtons[t].element.on("mousedown",this.OnPressedDown,this),this.NavigationButtons[t].element.on(pc.EVENT_TOUCHSTART,this.OnPressedDown,this),this.NavigationButtons[t].element.on(pc.EVENT_TOUCHEND,this.OnToggleBus,this);this.firstTimeStoreSet()},BusSelectionHandler.prototype.OpenStore=function(){this.pressedDown&&(0===this.isInMainScene&&this.app.fire("game: setMainSceneVar"),this.StoreBackButton.setLocalPosition(61.783,-11.82,0),this.coinsReference.element.text=TotalCurrency.toString(),this.StoreScreen.enabled=!0,this.MainMenuScreen.enabled=!1,this.setBusSelectionState(),this.pressedDown=!1)},BusSelectionHandler.prototype.CloseStore=function(){this.pressedDown&&(this.app.root.findByName("AllSounds").sound.slot("Tick").play(),this.StoreScreen.enabled=!1,this.MainMenuScreen.enabled=!0,this.pressedDown=!1)},BusSelectionHandler.prototype.LoadSetStorageData=function(e,t,s){TotalCurrency=this.getLocalStorageItem("currency",!1)||e,this.setLocalStorageItem("currency",TotalCurrency,!1),busUsing=this.getLocalStorageItem("SelectedBus",!1)||t,this.setLocalStorageItem("SelectedBus",busUsing,!1),busBought=this.getLocalStorageItem("BusesBought",!0)||s,this.setLocalStorageItem("BusesBought",busBought,!0)},BusSelectionHandler.prototype.firstTimeStoreSet=function(){this.LoadSetStorageData(300,0,[1,0,0,0,0,0,0,0,0]),this.tempBusSelected=busUsing,this.setBusSelectionState()},BusSelectionHandler.prototype.OnPressedDown=function(e){this.pressedDown=!0},BusSelectionHandler.prototype.OnToggleBus=function(e){this.pressedDown&&(this.tempNavigation=e.element.entity.tags.list()[0].split("_")[1],this.tempNavigation=parseInt(this.tempNavigation),0===this.tempNavigation?this.tempToggleBus>0&&(this.tempToggleBus--,this.navigationUsed=!0,this.pressedDown=!0,this.selectBus(null),this.ToggleBusGroupsNavigation(this.tempToggleBus)):1===this.tempNavigation&&this.tempToggleBus<this.BusGroups.length-1&&(this.tempToggleBus++,this.navigationUsed=!0,this.pressedDown=!0,this.selectBus(null),this.ToggleBusGroupsNavigation(this.tempToggleBus)),this.pressedDown=!1)},BusSelectionHandler.prototype.ToggleBusGroupsNavigation=function(e){for(var t=0;t<this.BusGroups.length;t++)t===e?(this.BusGroups[t].enabled=!0,this.ToggleBuses(t)):this.BusGroups[t].enabled=!1},BusSelectionHandler.prototype.ToggleBusGroups=function(e){for(var t=0;t<this.BusGroups.length;t++)this.BusGroups[t].enabled=t===e},BusSelectionHandler.prototype.ToggleBuses=function(e){var t=this.app.root.findByName("AllSounds");!1===isFirstTimeStore?t.sound.slot("Tick").play():isFirstTimeStore=!1;for(var s=0;s<this.BusesImages.length;s++)this.BusesImages[s].enabled=s===e;0===e?(this.NavigationButtons[0].enabled=!1,this.NavigationButtons[1].enabled=!0):8===e?(this.NavigationButtons[0].enabled=!0,this.NavigationButtons[1].enabled=!1):(this.NavigationButtons[0].enabled=!0,this.NavigationButtons[1].enabled=!0)},BusSelectionHandler.prototype.selectBus=function(e){this.pressedDown&&(this.navigationUsed?(this.navigationUsed=!1,this.tempSelected=this.tempToggleBus):(this.tempSelected=e.element.entity.tags.list()[0].split("_")[1],this.tempSelected=parseInt(this.tempSelected)),this.tempBusSelected=this.tempSelected,this.ToggleBuses(this.tempSelected),this.ToggleBusButtonsHighlight(this.tempSelected),!1===this.checkBusLocked(this.tempSelected)?!0===this.checkBusBought(this.tempSelected)?busUsing!=this.tempSelected?(this.StateButton.enabled=!1,this.SelectedBtn.enabled=!1,this.SelectBtn.enabled=!0,this.ToggleMainButton(!0,!1,"Select",!1,!1,!1)):(this.StateButton.enabled=!1,this.SelectedBtn.enabled=!0,this.SelectBtn.enabled=!1,this.ToggleMainButton(!1,!0,"Selected",!1,!1,!1),CANDEBUG&&console.log("already bought and using")):(this.SelectedBtn.enabled=!1,this.SelectBtn.enabled=!1,this.StateButton.enabled=!0,this.ToggleMainButton(!0,!1,this.BusPrices[this.tempSelected],!0,!0,!1)):(this.SelectedBtn.enabled=!1,this.SelectBtn.enabled=!1,this.StateButton.enabled=!0,this.ToggleMainButton(!0,!1,this.BusPrices[this.tempSelected],!0,!0,!0)),this.pressedDown=!1)},BusSelectionHandler.prototype.stateButtonPressed=function(e){if(this.pressedDown){if(!1===this.checkBusLocked(this.tempSelected))if(!0===this.checkBusBought(this.tempBusSelected))if(busUsing!=this.tempBusSelected)this.app.root.findByName("AllSounds").sound.slot("OnPurchase").play(),CANDEBUG&&console.log("bought now can use"),this.TweakBusSelection(!1);else CANDEBUG&&console.log("already bought and using");else if(TotalCurrency>=this.BusPrices[this.tempBusSelected])this.app.root.findByName("AllSounds").sound.slot("CoinDecrement").play(),this.setCurrency(this.BusPrices[this.tempBusSelected],!0),this.TweakBusSelection(!0);else this.app.root.findByName("AllSounds").sound.slot("EnoughCoin").play(),this.ShowToastMessage("You do not have enough coins.",2e3);this.pressedDown=!1}},BusSelectionHandler.prototype.setCurrency=function(e,t){t?TotalCurrency-=e:TotalCurrency=e,this.setLocalStorageItem("currency",TotalCurrency,!1),this.coinsReference.element.text=TotalCurrency.toString()},BusSelectionHandler.prototype.TrackableStatsBusesFamobi=function(){!1===useAPI?(total_buses_purchased_ever=parseFloat(localStorage.getItem("total_buses_purchased"))||0,total_buses_purchased_ever+=1,localStorage.setItem("total_buses_purchased",total_buses_purchased_ever)):(total_buses_purchased_ever=parseFloat(window.famobi.localStorage.getItem("total_buses_purchased"))||0,total_buses_purchased_ever+=1,window.famobi.localStorage.setItem("total_buses_purchased",total_buses_purchased_ever),this.app.root.findByTag("API")[0].script.famobiApi.FamobiTrackableStats("total_buses_purchased",total_buses_purchased_ever))},BusSelectionHandler.prototype.TweakBusSelection=function(e){e&&(busBought[this.tempBusSelected]=1,this.setLocalStorageItem("BusesBought",busBought,!0),this.TrackableStatsBusesFamobi()),busUsing=this.tempBusSelected,this.setLocalStorageItem("SelectedBus",busUsing,!1),this.setBusSelectionState()},BusSelectionHandler.prototype.ShowToastMessage=function(e,t){this.ToastReference.enabled=!0,this.ToastReference.children[0].children[0].element.text=e;var s=this;setTimeout(function(){s.ToastReference.enabled=!1,s.ToastReference.children[0].children[0].element.text=""},t)},BusSelectionHandler.prototype.checkBusBought=function(e){var t=!1;return 1===busBought[e]&&(t=!0),t},BusSelectionHandler.prototype.checkBusLocked=function(e){var t=!1;return 1===isLocked[e]&&(t=!0),t},BusSelectionHandler.prototype.setBusSelectionState=function(){for(var e=0;e<busBought.length;e++)1===busBought[e]&&e==busUsing&&this.manipulateSelection(e,!0)},BusSelectionHandler.prototype.manipulateSelection=function(e,t){t&&(this.ToggleBuses(e),this.ToggleBusGroups(e),this.tempToggleBus=e,this.ToggleBusButtonsHighlight(e),this.ToggleBusButtonsPrice(e),this.StateButton.enabled=!1,this.SelectedBtn.enabled=!0,this.SelectBtn.enabled=!1)},BusSelectionHandler.prototype.ToggleMainButton=function(e,t,s,n,o,i){this.StateButton.button.active=e,this.StateButton.children[0].enabled=t,this.StateButton.children[1].element.text=s,this.StateButton.children[2].enabled=!1,this.StateButton.children[3].enabled=o,this.StateButton.children[4].enabled=i},BusSelectionHandler.prototype.ToggleBusButtonsHighlight=function(e){for(var t=0;t<this.BusSelectButtons.length;t++)this.BusSelectButtons[t].children[3].enabled=t===e},BusSelectionHandler.prototype.ToggleBusButtonsPrice=function(e){for(var t=0;t<this.BusSelectButtons.length;t++)t===e?this.BusSelectButtons[t].children[2].enabled=!1:!0===this.checkBusBought(t)?this.BusSelectButtons[t].children[2].enabled=!1:this.BusSelectButtons[t].children[2].enabled=!0},BusSelectionHandler.prototype.setLocalStorageItem=function(e,t,s){!1===useAPI?s?localStorage.setItem(e,JSON.stringify(t)):localStorage.setItem(e,t):this.app.root.findByTag("API")[0].script.famobiApi.setFamobiLocalStorage(e,t,s)},BusSelectionHandler.prototype.getLocalStorageItem=function(e,t){return!1===useAPI?t?JSON.parse(localStorage.getItem(e)):localStorage.getItem(e):this.app.root.findByTag("API")[0].script.famobiApi.getFamobiLocalStorage(e,t)};var TweeenCamera=pc.createScript("tweeenCamera");TweeenCamera.prototype.initialize=function(){},TweeenCamera.prototype.update=function(e){};var StripesTween=pc.createScript("stripesTween");StripesTween.attributes.add("materials",{type:"asset",assetType:"material",array:!0,title:"Materials"}),StripesTween.attributes.add("isWinPointer",{type:"number",default:0});var isNearReverseSign=!1;StripesTween.prototype.initialize=function(){this.materialIndex=0,this.temp=.3},StripesTween.prototype.update=function(e){this.temp<=0?(this.temp=.3,this.ChangeMaterial()):this.temp-=e},StripesTween.prototype.ChangeOpacity=function(e){isNearReverseSign=e},StripesTween.prototype.ChangeMaterial=function(){0===this.materialIndex?this.materialIndex=1:this.materialIndex=0;for(var e=this.materials[this.materialIndex],t=this.entity.model.meshInstances,i=0;i<t.length;++i){var a=t[i];a.material=e.resource,1===this.isWinPointer&&!0===isNearReverseSign?(a.material.opacity=.3,a.material.update()):(a.material.opacity=1,a.material.update())}};var ResetText=pc.createScript("resetText");ResetText.attributes.add("HealthText",{type:"entity"}),ResetText.prototype.initialize=function(){this.ResetHealthText(),this.on("enable",this.ResetHealthText,this)},ResetText.prototype.update=function(t){this.HealthText.element.text=""},ResetText.prototype.ResetHealthText=function(){this.HealthText.element.text=""};var tweenMan,TweenGate=pc.createScript("tweenGate"),isLoopRun=!0,waitTime=!1;TweenGate.attributes.add("duration",{type:"number",default:1}),TweenGate.attributes.add("easing",{type:"string",default:"Linear"}),TweenGate.attributes.add("delay",{type:"number",default:0}),TweenGate.attributes.add("loop",{type:"boolean",default:!0}),TweenGate.attributes.add("yoyo",{type:"boolean",default:!1}),TweenGate.attributes.add("repeat",{type:"number",default:2}),TweenGate.attributes.add("rotateAngle",{type:"number",default:120}),TweenGate.attributes.add("timer",{type:"number",default:5}),TweenGate.attributes.add("collider",{type:"entity"}),TweenGate.prototype.initialize=function(){tweenMan=this,this.timers=this.timer,this.reset(),this.alterTime=!0,this.keepMoving=!0,this.on("attr:duration",function(t){this.tween.duration=t},this),this.collider.collision.on("triggerenter",this.onTriggerEnter,this),this.on("attr:easing",this.reset,this),this.on("attr:delay",this.reset,this),this.on("attr:loop",this.reset,this),this.on("attr:yoyo",this.reset,this),this.on("attr:repeat",this.reset,this)},TweenGate.prototype.reset=function(){},TweenGate.prototype.alterTimes=function(){setTimeout(function(){tweenMan.alterTime=!0},10)},TweenGate.prototype.onTriggerEnter=function(t){CANDEBUG&&console.log("isCollided to gate"),t.tags.has("GateCollide")&&(this.keepMoving=!1)},TweenGate.prototype.update=function(t){if(!1!==this.keepMoving){!1===waitTime?isLoopRun?this.entity.rotateLocal(0,0,t*this.rotateAngle):this.entity.rotateLocal(0,0,t*this.rotateAngle*-1):(this.timers-=t,this.timers<0&&(waitTime=!1,this.alterTimes(),this.timers=this.timer));var e=this.entity.getLocalEulerAngles();!0===this.alterTime&&(e.z>90?(isLoopRun=!1,waitTime=!0,this.alterTime=!1):e.z<0&&(isLoopRun=!0,waitTime=!0,this.alterTime=!1))}};var SelfTutorial,HandSymbolSelf,TweenWaveSymbolSelf,Tutorials=pc.createScript("tutorials"),ishandTweenComplete=!0,isWaveTweenComplete=!0,tweenSpeed=1;Tutorials.attributes.add("hand",{type:"entity"}),Tutorials.attributes.add("isWave",{type:"number",default:0}),Tutorials.attributes.add("wave",{type:"entity"}),Tutorials.prototype.initialize=function(){SelfTutorial=this,this.isWave&&(this.wave.enabled=!1)},Tutorials.prototype.update=function(e){!0===isTutorialOn&&!0===ishandTweenComplete&&this.TweenHandSymbol()},Tutorials.prototype.TweenHandSymbol=function(){!0===ishandTweenComplete&&(HandSymbolSelf=this,ishandTweenComplete=!1,this.hand.tween(this.hand.getLocalScale()).to(new pc.Vec3(1.2,1.2,1.2),.5/tweenSpeed,pc.SineOut).yoyo(!0).repeat(2).start().on("complete",function(){1===HandSymbolSelf.isWave?(HandSymbolSelf.wave.enabled=!0,HandSymbolSelf.TweenWaveSymbol()):ishandTweenComplete=!0}))},Tutorials.prototype.TweenWaveSymbol=function(){!0===isWaveTweenComplete&&(TweenWaveSymbolSelf=this,isWaveTweenComplete=!1,this.wave.tween(this.wave.getLocalScale()).to(new pc.Vec3(1.2,1.2,1.2),.1/tweenSpeed,pc.SineOut).yoyo(!0).repeat(2).start().on("complete",function(){TweenWaveSymbolSelf.wave.enabled=!1,ishandTweenComplete=!0,isWaveTweenComplete=!0}))};var SelfTutorialManager,MainApplication,TutorialManager=pc.createScript("tutorialManager"),AnyPanelOn=!0,PressedCounter=!1,isKeyPress=!1,isUpTutorialDone=!1,isLeftTutorialDone=!1,isRightTutorialDone=!1,isBackTutorialDone=!1,isUIBtnShown=!1,isTutorialPlaying=!1;TutorialManager.attributes.add("AllPanels",{type:"entity",array:!0}),TutorialManager.attributes.add("MobilePanel",{type:"entity",array:!0}),TutorialManager.prototype.initialize=function(){this.GainedAcceleration=!1,this.RightKeyPressed=!1,this.healthTime=0,SelfTutorialManager=this,this.AccelerateKey=pc.app.root.findByName("realPedal"),this.RightKey=pc.app.root.findByName("RightPedal"),this.LeftKey=pc.app.root.findByName("leftPedal"),this.brakePedal=pc.app.root.findByName("BrakePedal"),this.isLeftKeyShow=!1,this.isRightKeyShow=!1,this.isUpKeyShow=!1,this.isDownKeyShow=!1,this.isUIBtnShow=!1,MainApplication=this.app,isMobile||(this.app.mouse.on(pc.EVENT_MOUSEDOWN,this.onMouseClicked,this),this.app.keyboard.on(pc.EVENT_KEYDOWN,this.AnyBtnPressed,this)),isMobile&&(this.AllPanels[0]=this.MobilePanel[0],this.AllPanels[1]=this.MobilePanel[1],this.AllPanels[2]=this.MobilePanel[2],this.AllPanels[3]=this.MobilePanel[3])},TutorialManager.prototype.onMouseClicked=function(){this.isUIBtnShow&&(MainApplication.timeScale=1,tweenSpeed=1,SelfTutorialManager.AllPanels[4].enabled=!1)},TutorialManager.prototype.UIBtnPressed=function(){!1===isUIBtnShown&&(isUIBtnShown=!0,MainApplication.timeScale=1,tweenSpeed=1,SelfTutorialManager.AllPanels[4].enabled=!1)},TutorialManager.prototype.AnyBtnPressed=function(){isPause||((this.app.keyboard.isPressed(pc.KEY_W)||this.app.keyboard.isPressed(pc.KEY_UP))&&this.upKeyPressed(),(this.app.keyboard.isPressed(pc.KEY_D)||this.app.keyboard.isPressed(pc.KEY_RIGHT))&&this.rightKeyPressed(),(this.app.keyboard.isPressed(pc.KEY_A)||this.app.keyboard.isPressed(pc.KEY_LEFT))&&this.leftKeyPressed(),(this.app.keyboard.isPressed(pc.KEY_S)||this.app.keyboard.isPressed(pc.KEY_DOWN))&&this.backKeyPressed())},TutorialManager.prototype.CheckAnyTutorial=function(e){MainApplication.timeScale=1,tweenSpeed=1,!0===this.isUpKeyShow&&!1===isUpTutorialDone?(SelfTutorialManager.AllPanels[0].enabled=!1,this.isUpKeyShow=!1):!0===this.isLeftKeyShow&&!1===isLeftTutorialDone?(CANDEBUG&&console.log("In left"),setTimeout(function(){pc.app.root.findByName("LeftKeyT").enabled=!0},2e3),SelfTutorialManager.AllPanels[1].enabled=!1,this.isLeftKeyShow=!1,isLeftCalled=!1):!0===this.isRightKeyShow&&!1===isRightTutorialDone?(SelfTutorialManager.AllPanels[2].enabled=!1,setTimeout(function(){pc.app.root.findByName("RightKeyT").enabled=!0},2e3),this.isRightKeyShow=!1,isRightCalled=!1):!1===isBackTutorialDone&&!0===this.isBackKeyShow&&(SelfTutorialManager.AllPanels[3].enabled=!1,setTimeout(function(){var e=pc.app.root.findByName("BackT"),i=pc.app.root.findByName("BackT2");e.enabled=!0,i.enabled=!0},2e3),isBackCalled=!1,this.isBackKeyShow=!1)},TutorialManager.prototype.upKey=function(e){!0!==isUpTutorialDone&&!1===this.isUpKeyShow&&(isTutorialPlaying=!0,MainApplication.timeScale=.1,tweenSpeed=10,this.isUpKeyShow=!0,this.AllPanels[0].enabled=!0)},TutorialManager.prototype.isUpKeyShowBool=function(e){return this.isUpKeyShow},TutorialManager.prototype.isRightKeyShowBool=function(e){return this.isRightKeyShow},TutorialManager.prototype.isLeftKeyShowBool=function(e){return this.isLeftKeyShow},TutorialManager.prototype.isBrakeKeyShowBool=function(e){return this.isBackKeyShow},TutorialManager.prototype.upKeyPressed=function(e){!0!==isUpTutorialDone&&!0===this.isUpKeyShow&&setTimeout(function(){isTutorialPlaying=!1,MainApplication.timeScale=1,tweenSpeed=1,SelfTutorialManager.AllPanels[0].enabled=!1,isUpTutorialDone=!0},100)},TutorialManager.prototype.leftKey=function(e){MainApplication.timeScale=.1,tweenSpeed=10,isTutorialPlaying=!0,this.isLeftKeyShow=!0,this.AllPanels[1].enabled=!0},TutorialManager.prototype.leftKeyPressed=function(e){!0!==isLeftTutorialDone&&!0===this.isLeftKeyShow&&setTimeout(function(){isTutorialPlaying=!1,tweenSpeed=1,MainApplication.timeScale=1,SelfTutorialManager.AllPanels[1].enabled=!1,isLeftTutorialDone=!0},100)},TutorialManager.prototype.rightKey=function(e){MainApplication.timeScale=.1,tweenSpeed=10,isBackCalled&&(isTutorialOn=!1),isTutorialPlaying=!0,this.isRightKeyShow=!0,this.AllPanels[2].enabled=!0},TutorialManager.prototype.rightKeyPressed=function(e){!0!==isRightTutorialDone&&!0===this.isRightKeyShow&&setTimeout(function(){isTutorialPlaying=!1,tweenSpeed=1,MainApplication.timeScale=1,CANDEBUG&&console.log("timescaleR "+MainApplication.timeScale),SelfTutorialManager.AllPanels[2].enabled=!1,isRightTutorialDone=!0},100)},TutorialManager.prototype.backKey=function(e){MainApplication.timeScale=.1,tweenSpeed=10,isTutorialPlaying=!0,this.isBackKeyShow=!0,this.isDownKeyShow=!0,this.AllPanels[3].enabled=!0},TutorialManager.prototype.backKeyPressed=function(e){!0!==isBackTutorialDone&&!0===this.isBackKeyShow&&setTimeout(function(){isTutorialPlaying=!1,4===LevelNumber&&(isTutorialOn=!1),MainApplication.timeScale=1,tweenSpeed=1,SelfTutorialManager.AllPanels[3].enabled=!1,isBackTutorialDone=!0},100)},TutorialManager.prototype.highlightNextBtn=function(e){MainApplication.timeScale=.1,tweenSpeed=10,this.isUIBtnShow=!0,this.AllPanels[4].enabled=!0},TutorialManager.prototype.update=function(e){isTutorialOn};var PanelSelf,originalObj,PanelAnimations=pc.createScript("panelAnimations");PanelAnimations.attributes.add("MainPanel",{type:"entity"}),PanelAnimations.prototype.initialize=function(){this.ActivateAnimation(),this.on("enable",this.ActivateAnimation,this)},PanelAnimations.prototype.ActivateAnimation=function(n){this.MainPanel.setLocalScale(.5,.5,.5),PanelSelf=this,originalObj=this.MainPanel,this.MainPanel.tween(this.MainPanel.getLocalScale()).to(new pc.Vec3(1.7,1.7,1.7),.15,pc.SineOut).loop(!1).yoyo(!0).start().on("complete",function(){originalObj.tween(PanelSelf.MainPanel.getLocalScale()).to(new pc.Vec3(.5,.5,.5),.1,pc.SineOut).loop(!1).yoyo(!0).start().on("complete",function(){originalObj.tween(PanelSelf.MainPanel.getLocalScale()).to(new pc.Vec3(1,1,1),.18,pc.SineOut).loop(!1).yoyo(!0).start().on("complete",function(){CANDEBUG&&console.log("all completed")})})},this)};var SelfBlink,BlinkReverse=pc.createScript("blinkReverse");BlinkReverse.attributes.add("blinkingText",{type:"entity"}),BlinkReverse.prototype.initialize=function(){SelfBlink=this,this.isBlinkingStart=!1},BlinkReverse.prototype.update=function(i){!1===this.isBlinkingStart&&(this.isBlinkingStart=!0,this.startBlinking())},BlinkReverse.prototype.startBlinking=function(){setTimeout(function(){SelfBlink.blinkingText.enabled=!1,setTimeout(function(){SelfBlink.blinkingText.enabled=!0,SelfBlink.isBlinkingStart=!1},600)},600)};var DisableEntity=pc.createScript("disableEntity");DisableEntity.prototype.initialize=function(){this.OnEnable(),this.on("enable",this.OnEnable,this)},DisableEntity.prototype.OnEnable=function(){isTutorialOn||(this.entity.enabled=!1),2===LevelNumber&&!0===isLeftTutorialDone?this.entity.enabled=!1:2===LevelNumber&&!0===isRightTutorialDone&&(CANDEBUG&&console.log("Right Entity"),this.entity.enabled=!1)};"undefined"!=typeof document&&(function(t,e){function s(t,e){for(var n in e)try{t.style[n]=e[n]}catch(t){}return t}function H(t){return null==t?String(t):"object"==typeof t||"function"==typeof t?Object.prototype.toString.call(t).match(/\s([a-z]+)/i)[1].toLowerCase()||"object":typeof t}function R(t,e){if("array"!==H(e))return-1;if(e.indexOf)return e.indexOf(t);for(var n=0,o=e.length;n<o;n++)if(e[n]===t)return n;return-1}function I(){var t,e=arguments;for(t in e[1])if(e[1].hasOwnProperty(t))switch(H(e[1][t])){case"object":e[0][t]=I({},e[0][t],e[1][t]);break;case"array":e[0][t]=e[1][t].slice(0);break;default:e[0][t]=e[1][t]}return 2<e.length?I.apply(null,[e[0]].concat(Array.prototype.slice.call(e,2))):e[0]}function N(t){return 1===(t=Math.round(255*t).toString(16)).length?"0"+t:t}function S(t,e,n,o){t.addEventListener?t[o?"removeEventListener":"addEventListener"](e,n,!1):t.attachEvent&&t[o?"detachEvent":"attachEvent"]("on"+e,n)}function D(t,o){function g(t,e,n,o){return l[0|t][Math.round(Math.min((e-n)/(o-n)*z,z))]}function r(){C.legend.fps!==L&&(C.legend.fps=L,C.legend[c]=L?"FPS":"ms"),w=L?O.fps:O.duration,C.count[c]=999<w?"999+":w.toFixed(99<w?0:F.decimals)}function m(){for(p=n(),T<p-F.threshold&&(O.fps-=O.fps/Math.max(1,60*F.smoothing/F.interval),O.duration=1e3/O.fps),y=F.history;y--;)j[y]=0===y?O.fps:j[y-1],q[y]=0===y?O.duration:q[y-1];if(r(),F.heat){if(E.length)for(y=E.length;y--;)E[y].el.style[h[E[y].name].heatOn]=L?g(h[E[y].name].heatmap,O.fps,0,F.maxFps):g(h[E[y].name].heatmap,O.duration,F.threshold,0);if(C.graph&&h.column.heatOn)for(y=M.length;y--;)M[y].style[h.column.heatOn]=L?g(h.column.heatmap,j[y],0,F.maxFps):g(h.column.heatmap,q[y],F.threshold,0)}if(C.graph)for(v=0;v<F.history;v++)M[v].style.height=(L?j[v]?Math.round(b/F.maxFps*Math.min(j[v],F.maxFps)):0:q[v]?Math.round(b/F.threshold*Math.min(q[v],F.threshold)):0)+"px"}function k(){20>F.interval?(f=i(k),m()):(f=setTimeout(k,F.interval),x=i(m))}function G(t){(t=t||window.event).preventDefault?(t.preventDefault(),t.stopPropagation()):(t.returnValue=!1,t.cancelBubble=!0),O.toggle()}function U(){F.toggleOn&&S(C.container,F.toggleOn,G,1),t.removeChild(C.container)}function V(){if(C.container&&U(),h=D.theme[F.theme],!(l=h.compiledHeatmaps||[]).length&&h.heatmaps.length){for(v=0;v<h.heatmaps.length;v++)for(l[v]=[],y=0;y<=z;y++){var e,n=l[v],o=y;e=.33/z*y;var a=h.heatmaps[v].saturation,i=h.heatmaps[v].lightness,p=void 0,c=void 0,u=void 0,d=u=void 0,g=p=c=void 0;g=void 0;0===(u=.5>=i?i*(1+a):i+a-i*a)?e="#000":(c=(u-(d=2*i-u))/u,g=(e*=6)-(p=Math.floor(e)),g*=u*c,0===p||6===p?(p=u,c=d+g,u=d):1===p?(p=u-g,c=u,u=d):2===p?(p=d,c=u,u=d+g):3===p?(p=d,c=u-g):4===p?(p=d+g,c=d):(p=u,c=d,u-=g),e="#"+N(p)+N(c)+N(u)),n[o]=e}h.compiledHeatmaps=l}for(var m in C.container=s(document.createElement("div"),h.container),C.count=C.container.appendChild(s(document.createElement("div"),h.count)),C.legend=C.container.appendChild(s(document.createElement("div"),h.legend)),C.graph=F.graph?C.container.appendChild(s(document.createElement("div"),h.graph)):0,E.length=0,C)C[m]&&h[m].heatOn&&E.push({name:m,el:C[m]});if(M.length=0,C.graph)for(C.graph.style.width=F.history*h.column.width+(F.history-1)*h.column.spacing+"px",y=0;y<F.history;y++)M[y]=C.graph.appendChild(s(document.createElement("div"),h.column)),M[y].style.position="absolute",M[y].style.bottom=0,M[y].style.right=y*h.column.width+y*h.column.spacing+"px",M[y].style.width=h.column.width+"px",M[y].style.height="0px";s(C.container,F),r(),t.appendChild(C.container),C.graph&&(b=C.graph.clientHeight),F.toggleOn&&("click"===F.toggleOn&&(C.container.style.cursor="pointer"),S(C.container,F.toggleOn,G))}"object"===H(t)&&t.nodeType===e&&(o=t,t=document.body),t||(t=document.body);var h,l,p,f,x,b,w,y,v,O=this,F=I({},D.defaults,o||{}),C={},M=[],z=100,E=[],A=F.threshold,P=0,T=n()-A,j=[],q=[],L="fps"===F.show;O.options=F,O.fps=0,O.duration=0,O.isPaused=0,O.tickStart=function(){P=n()},O.tick=function(){p=n(),A+=(p-T-A)/F.smoothing,O.fps=1e3/A,O.duration=P<T?A:p-P,T=p},O.pause=function(){return f&&(O.isPaused=1,clearTimeout(f),a(f),a(x),f=x=0),O},O.resume=function(){return f||(O.isPaused=0,k()),O},O.set=function(t,e){return F[t]=e,L="fps"===F.show,-1!==R(t,u)&&V(),-1!==R(t,d)&&s(C.container,F),O},O.showDuration=function(){return O.set("show","ms"),O},O.showFps=function(){return O.set("show","fps"),O},O.toggle=function(){return O.set("show",L?"ms":"fps"),O},O.hide=function(){return O.pause(),C.container.style.display="none",O},O.show=function(){return O.resume(),C.container.style.display="block",O},O.destroy=function(){O.pause(),U(),O.tick=O.tickStart=function(){}},V(),k()}var n,o=t.performance;n=o&&(o.now||o.webkitNow)?o[o.now?"now":"webkitNow"].bind(o):function(){return+new Date};for(var a=t.cancelAnimationFrame||t.cancelRequestAnimationFrame,i=t.requestAnimationFrame,h=0,l=0,p=(o=["moz","webkit","o"]).length;l<p&&!a;++l)i=(a=t[o[l]+"CancelAnimationFrame"]||t[o[l]+"CancelRequestAnimationFrame"])&&t[o[l]+"RequestAnimationFrame"];a||(i=function(e){var o=n(),a=Math.max(0,16-(o-h));return h=o+a,t.setTimeout(function(){e(o+a)},a)},a=function(t){clearTimeout(t)});var c="string"===H(document.createElement("div").textContent)?"textContent":"innerText";D.extend=I,window.FPSMeter=D,D.defaults={interval:100,smoothing:10,show:"fps",toggleOn:"click",decimals:1,maxFps:60,threshold:100,position:"absolute",zIndex:10,left:"5px",top:"5px",right:"auto",bottom:"auto",margin:"0 0 0 0",theme:"dark",heat:0,graph:0,history:20};var u=["toggleOn","theme","heat","graph","history"],d="position zIndex left top right bottom margin".split(" ")}(window),function(t,e){e.theme={};var n=e.theme.base={heatmaps:[],container:{heatOn:null,heatmap:null,padding:"5px",minWidth:"95px",height:"30px",lineHeight:"30px",textAlign:"right",textShadow:"none"},count:{heatOn:null,heatmap:null,position:"absolute",top:0,right:0,padding:"5px 10px",height:"30px",fontSize:"24px",fontFamily:"Consolas, Andale Mono, monospace",zIndex:2},legend:{heatOn:null,heatmap:null,position:"absolute",top:0,left:0,padding:"5px 10px",height:"30px",fontSize:"12px",lineHeight:"32px",fontFamily:"sans-serif",textAlign:"left",zIndex:2},graph:{heatOn:null,heatmap:null,position:"relative",boxSizing:"padding-box",MozBoxSizing:"padding-box",height:"100%",zIndex:1},column:{width:4,spacing:1,heatOn:null,heatmap:null}};e.theme.dark=e.extend({},n,{heatmaps:[{saturation:.8,lightness:.8}],container:{background:"#222",color:"#fff",border:"1px solid #1a1a1a",textShadow:"1px 1px 0 #222"},count:{heatOn:"color"},column:{background:"#3f3f3f"}}),e.theme.light=e.extend({},n,{heatmaps:[{saturation:.5,lightness:.5}],container:{color:"#666",background:"#fff",textShadow:"1px 1px 0 rgba(255,255,255,.5), -1px -1px 0 rgba(255,255,255,.5)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},count:{heatOn:"color"},column:{background:"#eaeaea"}}),e.theme.colorful=e.extend({},n,{heatmaps:[{saturation:.5,lightness:.6}],container:{heatOn:"backgroundColor",background:"#888",color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.2)",boxShadow:"0 0 0 1px rgba(0,0,0,.1)"},column:{background:"#777",backgroundColor:"rgba(0,0,0,.2)"}}),e.theme.transparent=e.extend({},n,{heatmaps:[{saturation:.8,lightness:.5}],container:{padding:0,color:"#fff",textShadow:"1px 1px 0 rgba(0,0,0,.5)"},count:{padding:"0 5px",height:"40px",lineHeight:"40px"},legend:{padding:"0 5px",height:"40px",lineHeight:"42px"},graph:{height:"40px"},column:{width:5,background:"#999",heatOn:"backgroundColor",opacity:.5}})}(window,FPSMeter));var Fps=pc.createScript("fps");Fps.prototype.initialize=function(){this.fps=new FPSMeter({heat:!0,graph:!0})},Fps.prototype.update=function(t){this.fps.tick()};var SelfTweenManager,TweenSlidingObject=pc.createScript("tweenSlidingObject");TweenSlidingObject.attributes.add("secondsToComplete",{type:"number"}),TweenSlidingObject.attributes.add("delay",{type:"number"}),TweenSlidingObject.attributes.add("startingPosition",{type:"entity"}),TweenSlidingObject.attributes.add("endingPosition",{type:"entity"}),TweenSlidingObject.prototype.initialize=function(){SelfTweenManager=this,this.isTweenWorking=!1,this.temp=0,this.entity.setLocalPosition(this.startingPosition.getLocalPosition()),this.tween=this.entity.tween(this.entity.getLocalPosition()).to(this.endingPosition.getLocalPosition(),this.secondsToComplete,pc.Linear).delay(this.delay).loop(!1).yoyo(!1).start(),this.temp=this.secondsToComplete+this.delay,this.temp2=this.delay,this.isTweenStart=!0,this.isTweenEnd=!1},TweenSlidingObject.prototype.update=function(t){if(isDead)this.tween&&this.tween.stop();else if(this.isTweenStart)this.temp-=t,this.temp<=0&&(this.entity.children[1].enabled=!1,this.isTweenStart=!1,this.temp=this.secondsToComplete+this.delay,this.TweenFromEnd());else if(this.isTweenEnd){if(this.temp-=t,this.temp2-=t,this.temp2<=0){var e=this.entity.children[1];setTimeout(function(){e.enabled=!0,CANDEBUG&&console.log(e.enabled)},1e3),this.temp2=10}this.temp<=0&&(this.temp2=this.delay,this.isTweenEnd=!1,this.temp=this.secondsToComplete+this.delay,this.TweenFromStart())}},TweenSlidingObject.prototype.TweenFromStart=function(t){this.isTweenStart=!0,this.tween&&this.tween.stop(),this.entity.setLocalPosition(this.startingPosition.getLocalPosition()),this.tween=this.entity.tween(this.entity.getLocalPosition()).to(this.endingPosition.getLocalPosition(),this.secondsToComplete,pc.Linear).delay(this.delay).loop(!1).yoyo(!1).start()},TweenSlidingObject.prototype.TweenFromEnd=function(t){this.isTweenEnd=!0,this.tween&&this.tween.stop(),this.entity.setLocalPosition(this.endingPosition.getLocalPosition()),this.tween=this.entity.tween(this.entity.getLocalPosition()).to(this.startingPosition.getLocalPosition(),this.secondsToComplete,pc.Linear).delay(this.delay).loop(!1).yoyo(!1).start()};var TweenSlidingGate=pc.createScript("tweenSlidingGate");TweenSlidingGate.attributes.add("secondsToComplete",{type:"number"}),TweenSlidingGate.attributes.add("delay",{type:"number"}),TweenSlidingGate.attributes.add("startingPosition",{type:"entity"}),TweenSlidingGate.attributes.add("endingPosition",{type:"entity"}),TweenSlidingGate.prototype.initialize=function(){this.temp=0,this.isTweenStart=!1,this.isTweenEnd=!1},TweenSlidingGate.prototype.OnTween=function(){this.isTweenStart=!0,this.isTweenEnd=!1},TweenSlidingGate.prototype.OffTween=function(){this.isTweenStart=!1,this.isTweenEnd=!0},TweenSlidingGate.prototype.update=function(t){isDead?this.tween&&this.tween.stop():this.isTweenStart?(CANDEBUG&&console.log("In tweenStart"+this.temp),this.temp-=t,this.temp<=0&&(CANDEBUG&&console.log("In tweenStart CallingTweenEnd"),this.isTweenStart=!1,this.temp=this.delay,this.TweenFromStart())):this.isTweenEnd&&(this.temp-=t,CANDEBUG&&console.log("In tweenStart"),this.temp<=0&&(CANDEBUG&&console.log("In tweenEnd CallingTweenStart"),this.isTweenEnd=!1,this.temp=this.delay,this.TweenFromEnd()))},TweenSlidingGate.prototype.TweenFromStart=function(t){this.tween?(this.entity.setLocalPosition(this.entity.getLocalPosition()),this.tween.stop()):this.entity.setLocalPosition(this.startingPosition.getLocalPosition()),this.tween=this.entity.tween(this.entity.getLocalPosition()).to(this.endingPosition.getLocalPosition(),this.secondsToComplete,pc.Linear).delay(this.delay).loop(!1).yoyo(!1).start()},TweenSlidingGate.prototype.TweenFromEnd=function(t){this.tween&&this.tween.stop(),this.entity.setLocalPosition(this.endingPosition.getLocalPosition()),this.tween=this.entity.tween(this.entity.getLocalPosition()).to(this.startingPosition.getLocalPosition(),this.secondsToComplete,pc.Linear).delay(this.delay).loop(!1).yoyo(!1).start()};pc.script.createLoadingScreen(function(e){var t,a;t=["body {","    background-color: #283538;","}","#application-splash-wrapper {","    position: absolute;","    top: 0;","    left: 0;","    height: 100%;","    width: 100%;","    background-color: #283538;","}","#application-splash {","    position: absolute;","    top: calc(50% - 28px);","    width: 264px;","    left: calc(50% - 132px);","}","#application-splash img {","    width: 100%;","}","#progress-bar-container {","    margin: 20px auto 0 auto;","    height: 2px;","    width: 100%;","    background-color: #1d292c;","}","#progress-bar {","    width: 0%;","    height: 100%;","    background-color: #f60;","}","@media (max-width: 480px) {","    #application-splash {","        width: 170px;","        left: calc(50% - 85px);","    }","}"].join("\n"),(a=document.createElement("style")).type="text/css",a.styleSheet?a.styleSheet.cssText=t:a.appendChild(document.createTextNode(t)),document.head.appendChild(a),function(){var e=document.createElement("div");e.id="application-splash-wrapper",document.body.appendChild(e);var t=document.createElement("div");t.id="application-splash",e.appendChild(t),t.style.display="none";var a=document.createElement("img");a.src="https://s3-eu-west-1.amazonaws.com/static.playcanvas.com/images/play_text_252_white.png",t.appendChild(a),a.onload=function(){t.style.display="block"};var o=document.createElement("div");o.id="progress-bar-container",t.appendChild(o);var n=document.createElement("div");n.id="progress-bar",o.appendChild(n)}(),e.on("preload:end",function(){e.off("preload:progress")}),e.on("preload:progress",function(e){var t=document.getElementById("progress-bar");t&&(e=Math.min(1,Math.max(0,e)),t.style.width=100*e+"%")}),e.on("start",function(){var e=document.getElementById("application-splash-wrapper");e.parentElement.removeChild(e)})});