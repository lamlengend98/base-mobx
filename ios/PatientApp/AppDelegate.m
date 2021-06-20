#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AppCenterReactNative.h>
#import <AppCenterReactNativeAnalytics.h>
#import <AppCenterReactNativeCrashes.h>
#import "RNSplashScreen.h"
#import <CodePush/CodePush.h>
#import "RNVoipCall.h"                          /* <------ add this line */
#import <PushKit/PushKit.h>                    /* <------ add this line */
#import "RNVoipPushKit.h"                     /* <------ add this line */
#import <RNGoogleSignin/RNGoogleSignin.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@import Firebase;
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"PatientApp"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  [AppCenterReactNative register];
  [AppCenterReactNativeAnalytics registerWithInitiallyEnabled:true];
  [AppCenterReactNativeCrashes registerWithAutomaticProcessing];
  [RNSplashScreen show];
  [self voipRegistration];

  for (NSString *familyName in [UIFont familyNames]){
      NSLog(@"Family name: %@", familyName);
      for (NSString *fontName in [UIFont fontNamesForFamilyName:familyName]) {
          NSLog(@"--Font name: %@", fontName);
      }
  }
  [FIRApp configure];
  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [CodePush bundleURL];
    //[[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// Register for VoIP notifications
- (void) voipRegistration {
  dispatch_queue_t mainQueue = dispatch_get_main_queue();
  // Create a push registry object
  PKPushRegistry * voipRegistry = [[PKPushRegistry alloc] initWithQueue: mainQueue];
  // Set the registry's delegate to self
  voipRegistry.delegate = self;
  // Set the push type to VoIP
  voipRegistry.desiredPushTypes = [NSSet setWithObject:PKPushTypeVoIP];
}


// --- Handle updated push credentials
- (void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials:(PKPushCredentials *)credentials forType:(PKPushType)type {
  // Register VoIP push token (a property of PKPushCredentials) with server
  NSLog(@"did update push credentials with token: %@", credentials.token);

  [RNVoipPushKit didUpdatePushCredentials:credentials forType:(NSString *)type];
}

- (void)pushRegistry:(PKPushRegistry *)registry didInvalidatePushTokenForType:(PKPushType)type
{
  // --- The system calls this method when a previously provided push token is no longer valid for use. No action is necessary on your part to reregister the push type. Instead, use this method to notify your server not to send push notifications using the matching push token.
}


// --- Handle incoming pushes (for ios <= 10)
- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type {
   NSLog(@"Ajith");
  
  
  
  [RNVoipPushKit didReceiveIncomingPushWithPayload:payload forType:(NSString *)type];
}

// --- Handle incoming pushes (for ios >= 11)
- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type withCompletionHandler:(void (^)(void))completion {
  NSLog(@"Ajith");
  

  NSString *firstName = [[[[payload.dictionaryPayload objectForKey:@"custom"]
                           objectForKey:@"a"]
                           objectForKey:@"sender"]
                           objectForKey:@"firstName"];

  NSString *lastName = [[[[payload.dictionaryPayload objectForKey:@"custom"]
                           objectForKey:@"a"]
                           objectForKey:@"sender"]
                           objectForKey:@"lastName"];

  NSString *callerName = [NSString stringWithFormat:@"%@ %@", firstName, lastName];

  NSString *callerId = [[payload.dictionaryPayload objectForKey:@"custom"]
                        objectForKey:@"i"];

  NSString *callType = [[[[payload.dictionaryPayload objectForKey:@"custom"]
                          objectForKey:@"a"]
                        objectForKey:@"type"] stringValue];

  NSString *handle = [[[[payload.dictionaryPayload objectForKey:@"custom"]
                        objectForKey:@"a"]
                        objectForKey:@"sender"]
                        objectForKey:@"phone"];

  NSString *handleType = @"generic";
  BOOL hasVideo = false;
  

  @try {
    if([payload.dictionaryPayload[@"data"] isKindOfClass:[NSDictionary class]]){
      NSDictionary *dataPayload = payload.dictionaryPayload[@"data"];
      
      callerName = callerName ?  [NSString stringWithFormat: @"%@ is Calling", dataPayload[@"name"]] : @"RNVoip is Calling";
      
      callerId = callerId ? callerId : [[[NSUUID UUID] UUIDString] lowercaseString];
      
      handle = handle ?  handle : @"1234567890";
      
      handleType = [dataPayload[@"handleType"] isKindOfClass:[NSString class]] ?  dataPayload[@"handleType"] : @"generic";
      
      hasVideo = dataPayload[@"hasVideo"] ? true : false;
      
    }
  } @catch (NSException *exception) {
    
    NSLog(@"Error PushKit payload %@", exception);
    
  } @finally {
    
    
    NSLog(@"RNVoip caller id ===> %@    callerNAme  ==> %@ handle  ==> %@",callerId, callerName, hasVideo ? @"true": @"false");
    
    NSDictionary *extra = [payload.dictionaryPayload valueForKeyPath:@"data"];
    
    if ([callType isEqualToString:@"0"]) {
      [RNVoipPushKit didReceiveIncomingPushWithPayload:payload forType:(NSString *)type];
      return;
    }
    
    [RNVoipCall reportNewIncomingCall:callerId handle:handle handleType:handleType hasVideo:hasVideo localizedCallerName:callerName fromPushKit: YES payload:extra withCompletionHandler:completion];
    
    [RNVoipPushKit didReceiveIncomingPushWithPayload:payload forType:(NSString *)type];
    
  }
}

// AppDelegate.m
- (BOOL)application:(UIApplication *)application openURL:(nonnull NSURL *)url options:(nonnull NSDictionary<NSString *,id> *)options {
  return  [RNGoogleSignin application:application openURL:url options:options];
}

@end
