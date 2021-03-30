import { descriptionFiles } from "./description-files";

/**
 * Tdos los string con los contenidos de cada pagina 
 *  */
export class Contents {

  /**
   * 
   */
  public main() {
    return `
import './tools/routes.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Mision X',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        routes: routes.allRoutes);
  }
}
    `;

  }

  /**
   * 
   * @param fileName es el nombre del archivo .dart ej: edit-user
   * @param pageName es el nombre que tomará el stateWidget se crea en base al nombre del archivo ej: EditUser
   */

  public responsivePageContent(fileName: string, pageName: string): string {
    return `
import 'package:flutter/material.dart';
import 'package:responsive_builder/responsive_builder.dart';
import './${fileName}-desktop-view.dart';
import './${fileName}-mobile-view.dart';


class ${pageName}Page extends StatelessWidget {

@override
Widget build(BuildContext context) {
return ScreenTypeLayout(
    mobile: ${pageName}MobileView(),
    desktop: ${pageName}DesktopView(),
  );
}
}
  `;
  }


  /**
   * 
   * @param fileName es el nombre del archivo .dart ej: edit-user
   * @param pageName es el nombre que tomará el stateWidget se crea en base al nombre del archivo ej: EditUser
   * @param viewType define si es una vista movil o escritorio (si es un proyeto web), o simple (si es un proyecto solo movil)
   */

  public simplePageContent(fileName: string, pageName: string, viewType: string): string {
    let routeLine = (viewType !== "") ? "" : `static const route = '/${pageName}';`;
    return `
import 'package:flutter/material.dart';
import 'package:mvc_pattern/mvc_pattern.dart';
import './${fileName}-controller.dart';


class ${pageName}${viewType}Page extends StatefulWidget {
  ${routeLine}
  @override
  _${pageName}${viewType}PageState createState() => _${pageName}${viewType}PageState();
}

class _${pageName}${viewType}PageState extends StateMVC<${pageName}${viewType}Page> {
  _${pageName}${viewType}PageState() : super(${pageName}Controller()) {
    controller = ${pageName}Controller.con;
  }

  ${pageName}Controller controller;

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(title: Text(controller.pageName)),
      body: Container(
        child: Center(
          child: Text(controller.pageName+ "${viewType}"),
        ),
      ),
    );
    
  }
}
        `;
  }

  /**
   * 
   * @param name nombre del controller
   */

  public controllerContent(name: string): string {

    return `
import 'package:mvc_pattern/mvc_pattern.dart';

class ${name}Controller extends ControllerMVC {

factory ${name}Controller() {
    _this = ${name}Controller._();
    return _this;

}
static ${name}Controller _this;

${name}Controller._();

static ${name}Controller get con => _this;

String pageName = '${name}';
}
            `;
  }


  public loginPage() {

    return `
import 'package:flutter/material.dart';
import 'package:mvc_pattern/mvc_pattern.dart';

import './login-controller.dart';
import '../../tools/tools.dart';
import '../../widgets/buttons/buttons.dart';
import '../../widgets/inputs/inputs.dart';

class LoginPage extends StatefulWidget {
  static const route = '/Login';
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends StateMVC<LoginPage> {
  _LoginPageState() : super(LoginController()) {
    controller = LoginController.con;
  }

  LoginController controller;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.end,
          mainAxisSize: MainAxisSize.max,
          children: [
            Container(
                margin: dimens.bottom(context, .1),
                child: Text('MISIÓN X',
                    style: TextStyle(
                        color: Colors.black,
                        fontSize: dimens.fullWidth(context) * .1,
                        fontWeight: FontWeight.bold))),
            Container(
              margin: dimens.all(context, .03),
              padding: dimens.all(context, .05),
              decoration: BoxDecoration(
                  boxShadow: [
                    BoxShadow(
                        color: colors.textColor.withOpacity(.2),
                        blurRadius: 20,
                        spreadRadius: 3)
                  ],
                  color: Colors.white,
                  borderRadius: dimens.borderRadiusContainer(15.0)),
              child: Form(
                key: controller.formKey,
                child: Column(children: [
                  EmailInput(onSaved: () {}, onChanged: () {}),
                  Container(height: dimens.fullWidth(context) * .05),
                  PasswordInput(onSaved: () {}, onChanged: () {}),
                  Container(height: dimens.fullWidth(context) * .05),
                  SimpleButton(
                    color: colors.primaryColor,
                    label: 'Login',
                    onPressed: () => controller.validateForm(),
                  )
                ]),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
`

  }

  public loginController() {

    return `
import '../../src/home/home-page.dart';
import 'package:flutter/material.dart';
import 'package:mvc_pattern/mvc_pattern.dart';

class LoginController extends ControllerMVC {
  factory LoginController() {
    _this = LoginController._();
    return _this;
  }
  static LoginController _this;

  LoginController._();

  static LoginController get con => _this;
  BuildContext context;

  @override
  void initState() {
    Future.delayed(Duration.zero, () {
      context = con.stateMVC.context;
    });
    super.initState();
  }

  final formKey = GlobalKey<FormState>();

  validateForm() {
    if (formKey.currentState.validate()) {
      goToHome();
    }
  }

  goToHome() {
    Navigator.popAndPushNamed(context, HomePage.route);
  }
}
    
    `;
  }
  /**
   * Clase constants
   */

  public constants() {
    return `  
  ///  
  /// ${descriptionFiles.CONSTANTS}
  ///
  
  class Constants {
    /// versión actual de la aplicación
    final currentVersion = 100;

  }
  Constants constants = Constants();
  `;
  }

  /**
   * Clase colors
   */

  public colors() {

    return `
  import 'package:flutter/material.dart';  
  
  ///  
  /// ${descriptionFiles.COLORS}
  ///
  
  class CustomColors {

    final primaryColor = Color(0xFF0fa35f);
    final textColor = Color(0xFF707070);

  }
  CustomColors colors = CustomColors();
  `;
  }

  /**
   * Clase dimens
   */

  public dimens() {

    return `
  import 'package:flutter/material.dart';  
  
  ///  
  /// ${descriptionFiles.DIMENS}
  ///
  
  class Dimens {
   
    /// ancho total de la pantalla
    fullWidth(BuildContext context) {
      return MediaQuery.of(context).size.width;
    }
  
    /// largo total de la pantalla
    fullHeigth(BuildContext context) {
      return MediaQuery.of(context).size.height;
    }
  
    /// se puede utilizar en margin o padding de un widget toma como referencia el ancho de la pantalla
    fromLTRB(BuildContext context, left, top, right, bottom) {
      return EdgeInsets.fromLTRB(
        fullWidth(context) * left,
        fullWidth(context) * top,
        fullWidth(context) * right,
        fullWidth(context) * bottom,
      );
    }
  
    /// se puede utilizar en margin o padding de un widget toma como referencia el ancho de la pantalla
    symetric(BuildContext context, horizontal, vertical) {
      return EdgeInsets.symmetric(
        vertical: fullWidth(context) * vertical,
        horizontal: fullWidth(context) * horizontal,
      );
    }
  
    /// se puede utilizar en margin o padding de un widget toma como referencia el ancho de la pantalla
    all(BuildContext context, value) {
      return EdgeInsets.all(
        fullWidth(context) * value,
      );
    }
  
    /// se puede utilizar en margin o padding de un widget toma como referencia el ancho de la pantalla
    horizontal(BuildContext context, value) {
      return EdgeInsets.symmetric(
        horizontal: fullWidth(context) * value,
      );
    }
  
    /// se puede utilizar en margin o padding de un widget toma como referencia el ancho de la pantalla
    vertical(BuildContext context, value) {
      return EdgeInsets.symmetric(
        vertical: fullWidth(context) * value,
      );
    }
  
    /// se puede utilizar en margin o padding de un widget toma como referencia el ancho de la pantalla
    top(BuildContext context, value) {
      return EdgeInsets.only(
        top: fullWidth(context) * value,
      );
    }
  
    /// se puede utilizar en margin o padding de un widget toma como referencia el ancho de la pantalla
    left(BuildContext context, value) {
      return EdgeInsets.only(
        left: fullWidth(context) * value,
      );
    }
  
    /// se puede utilizar en margin o padding de un widget toma como referencia el ancho de la pantalla
    right(BuildContext context, value) {
      return EdgeInsets.only(
        right: fullWidth(context) * value,
      );
    }
  
    /// se puede utilizar en margin o padding de un widget toma como referencia el ancho de la pantalla
    bottom(BuildContext context, value) {
      return EdgeInsets.only(
        bottom: fullWidth(context) * value,
      );
    }
  
    layoutPadding(BuildContext context) {
      return EdgeInsets.fromLTRB(fullWidth(context) * .05,
          fullWidth(context) * .05, fullWidth(context) * .05, 0);
    }
  
    cardRaduis(BuildContext context) {
      return borderRadius(15.0);
    }
  
    borderRadius(radius) {
      return RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(radius),
      );
    }
  
    borderRadiusContainer(radius) {
      if (radius.runtimeType == int) {
        radius = double.parse('$radius');
      }
      return BorderRadius.all(Radius.circular(radius));
    }
  }
  Dimens dimens = Dimens();
  `;
  }

  /**
   * Clase dialogs
   */
  public dialogs() {
    return `
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';  
import 'tools.dart'; 
  
  ///  
  /// ${descriptionFiles.DIALOGS}
  ///

  class CustomDialogs{
    
    showMessageDialog(message, context, hasloading) {
      showDialog<void>(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return AlertDialog(
            shape: dimens.borderRadius(10.0),
            content: Text(message ?? ''),
            actions: <Widget>[
              FlatButton(
                child: Text(
                  'ACEPTAR',
                  style: TextStyle(color: colors.primaryColor),
                ),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      ).then((_) {
        /// en caso de que tenga un loading lo cierro tambien
        if (hasloading) {
          Navigator.pop(context);
        }
      });
    }
  
    showLoadingDialog(context) {
      try {
        showDialog(
            context: context,
            barrierDismissible: false,
            builder: (context) {
              return AlertDialog(
                  titlePadding: EdgeInsets.all(0),
                  contentPadding: EdgeInsets.all(0),
                  backgroundColor: Colors.transparent,
                  elevation: 0,
                  content: Container(
                    alignment: Alignment.center,
                  ));
            });
      } catch (e) {
        print('No context for loader');
        print(e);
      }
    }
  
    hideLoadingDialog(context) {
      try {
        Navigator.pop(context);
      } catch (e) {
        print('No context for loader');
        print(e);
      }
    }
  
    showDinamicDialog(Function whenComplete, BuildContext context, bool dimisible,
        Widget child) {
      return showDialog(
          context: context,
          barrierDismissible: dimisible,
          builder: (context) {
            return AlertDialog(
                titlePadding: EdgeInsets.all(0),
                contentPadding: EdgeInsets.all(0),
                backgroundColor: Colors.transparent,
                elevation: 0,
                content: child);
          }).whenComplete(() {
        if (whenComplete != null) {
          whenComplete();
        }
      });
    }
  
  }

  CustomDialogs customDialogs = CustomDialogs();
  `;
  }

  /**
   * Clase routes
   */
  public routes() {
    return `
import '../src/home/home-page.dart';
import '../src/login/login-page.dart';
///  
/// ${descriptionFiles.ROUTES}
///
class Routes {
  final allRoutes = {
    "/": (context) => LoginPage(),
    HomePage.route: (context) => HomePage(),
    LoginPage.route: (context) => LoginPage()
  };
}

Routes routes = Routes();
  `;
  }

  /**
   * Clase validators
   */
  public validators() {
    return `
  String validateEmail(String input) {
    {
      Pattern pattern =
          r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
      RegExp regex = new RegExp(pattern);
      if (!regex.hasMatch(input.trim())) {
        return 'Ingrese un correo electrónico válido';
      } else
        return null;
    }
  }

  String noValidate() {
    return null;
  }

  String validatePassword(input) {
    if (input.trim().length < 6) {
      return 'La contraseña debe tener mínimo 6 caracteres';
    }

    if (input.trim().length > 20) {
      return 'La contraseña debe tener máximo 20 caracteres';
    }

    return null;
  }

  String validateText(input) {
    if (input.trim() == "" || input.trim().length < 2)
      return 'Este campo es obligatorio';
    else
      return null;
  }

  String validatePhone(input) {
    String pattern = r'^(?:[+0][1-9])?[0-9]{7,20}$';
    RegExp regExp = RegExp(pattern);

    if (input.isNotEmpty && !regExp.hasMatch(input.trim())) {
      return 'Ingrese un teléfono válido';
    }
    return null;
  }

  String validateDocument(input) {
    String pattern = r'^[0-9]+$';
    RegExp regExp = new RegExp(pattern);

    if (input.trim().length < 6 || !regExp.hasMatch(input)) {
      return 'Ingrese un documento válido';
    } else {
      return null;
    }
  }
`;
  }

  /**
   * Se exportan todos los archivos de la carpeta tools
   */
  public imports() {
    return `
export  './colors.dart';
export  './constants.dart';
export  './dimens.dart';
export  './dialogs.dart';
export  './routes.dart';
export  './validators.dart';
  `;
  }

  /**
   * Código base input tipo email
   */
  public emailInput() {
    return `
import 'package:flutter/material.dart';
import '../../tools/tools.dart';


class EmailInput extends StatelessWidget {
  final VoidCallback onChanged;
  final VoidCallback onSaved;

  const EmailInput({Key key, @required this.onChanged, @required this.onSaved})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    return TextFormField(
        validator: validateText,
        onChanged: (x) => onChanged,
        onSaved: (x) => onSaved,
        style: TextStyle(color: colors.textColor, fontSize: 14),
        decoration: InputDecoration(
          border: OutlineInputBorder(
            borderSide: BorderSide(color: colors.textColor),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.black),
          ),
          errorBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.red[700]),
          ),
          focusColor: Colors.white,
          hintText: "Email",
          hintStyle: TextStyle(color: colors.textColor, fontSize: 14),
        ));
  }
}  
  `;
  }

  /**
 * Código base input tipo contraseña
 */
  public passwordInput() {
    return `
import 'package:flutter/material.dart';
import '../../tools/tools.dart';
class PasswordInput extends StatelessWidget {
  final VoidCallback onChanged;
  final VoidCallback onSaved;

  const PasswordInput(
      {Key key, @required this.onChanged, @required this.onSaved})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    return TextFormField(
        onChanged: (x) => onChanged,
        onSaved: (x) => onSaved,
        validator: validatePassword,
        obscureText: true,
        style: TextStyle(color: colors.textColor, fontSize: 14),
        decoration: InputDecoration(
          border: OutlineInputBorder(
            borderSide: BorderSide(color: colors.textColor),
          ),
          focusedBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.black),
          ),
          errorBorder: OutlineInputBorder(
            borderSide: BorderSide(color: Colors.red[700]),
          ),
          focusColor: Colors.white,
          hintText: "Password",
          hintStyle: TextStyle(color: colors.textColor, fontSize: 14),
        ));
  }
}
`;
  }

  /**
 * Código base botón simple
 */
  public simpleButton() {
    return `
import 'package:flutter/material.dart';
import '../../tools/tools.dart';

class SimpleButton extends StatelessWidget {
  final String label;
  final Color color;
  final Color textColor;
  final VoidCallback onPressed;

  const SimpleButton({
    Key key,
    @required this.label,
    @required this.onPressed,
    this.color,
    this.textColor = Colors.white,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return FlatButton(
        minWidth: double.infinity,
        height: dimens.fullWidth(context) * .12,
        color: color ?? colors.primaryColor,
        onPressed: () => onPressed(),
        child: Text('Login', style: TextStyle(color: textColor)));
  }
}
  `;
  }

  /**
 * Se exportan todos los archivos de la carpeta form
 */
  public inputs() {
    return `
export './email-input.dart';
export './password-input.dart';
    `;

  }

  /**
 * Se exportan todos los archivos de la carpeta buttons
 */

  public buttons() {
    return `export './simple-button.dart';`;

  }





  /**
   * SERVICESSSSS
   */


  public firebaseService() {
    return `
import 'package:cloud_firestore/cloud_firestore.dart';

/// este servicio se comunica directamente con la base de datos, todos los llamados deben ser atravez de el
class FirebaseService {
  FirebaseFirestore firestore = FirebaseFirestore.instance;

  Future<QuerySnapshot> getData(String documentId, String table) {
    return firestore.collection(table).where('id', isEqualTo: documentId).get();
  }

  Future<QuerySnapshot> getCollection(
      String collection, String property, String equal) {
    if (property != null) {
      return firestore
          .collection(collection)
          .where(property, isEqualTo: equal)
          .get();
    } else {
      return firestore.collection(collection).get();
    }
  }

  Stream<QuerySnapshot> getCollectionSnapshot(String collection) {
    return firestore.collection(collection).snapshots();
  }

  Stream<QuerySnapshot> getOrderedCollectionSnapshot(
      String collection, property, bool desc) {
    return firestore
        .collection(collection)
        .orderBy(property, descending: desc)
        .snapshots();
  }

  Stream<QuerySnapshot> getCollectionSnapshotQuery(
      String collection, String property, String equal) {
    return firestore
        .collection(collection)
        .where(property, isEqualTo: equal)
        .snapshots();
  }

  Future save(Map<String, dynamic> document, String table) async {
    String documentId = document['id'];

    if (documentId != null) {
      return firestore.collection(table).doc(documentId).set(document);
    } else {
      String id = createId(table);
      return firestore.collection(table).doc(id).set({'id': id, ...document});
    }
  }

  Future updateDocument(documentID, data, table) {
    return firestore.doc('$table/$documentID').update(data);
  }

  createId(collection) {
    CollectionReference collRef =
        FirebaseFirestore.instance.collection(collection);
    DocumentReference docReferance = collRef.doc();
    return docReferance.id;
  }

  deleteDocument(documentId, collection) {
    return firestore.collection(collection).doc(documentId).delete();
  }

  Future<DocumentSnapshot> getDocument(documentId, collection) {
    return firestore.collection(collection).doc(documentId).get();
  }
}

final FirebaseService firebaseService = FirebaseService();
        `;


  }
  public authService() {
    return `
import 'package:firebase_auth/firebase_auth.dart';

/// este servicio será usado para manejar toda la autenticación y registro de los usuarios

class AuthService {
  ///Attempts to sign in a user with the given email address and password.
  Future<UserCredential> logIn(String email, String password) async {
    return await FirebaseAuth.instance.signInWithEmailAndPassword(
        email: email.trim(), password: password.trim());
  }

  ///Tries to create a new user account with the given email address and password.
  Future<UserCredential> signUp(String email, String password) async {
    return await FirebaseAuth.instance
        .createUserWithEmailAndPassword(email: email, password: password);
  }

  /// Triggers the Firebase Authentication backend to send a password-reset email to the given email address,
  /// which must correspond to an existing user of your app
  Future sendPasswordReset(String email) async {
    return await FirebaseAuth.instance.sendPasswordResetEmail(email: email);
  }

  /// This void returns the current [User] if they are currently signed-in, or null if not.
  User getCurrentId() {
    return FirebaseAuth.instance.currentUser;
  }

  /// Signs out the current user.
  Future signOut() {
    return FirebaseAuth.instance.signOut();
  }
}

final AuthService auth = AuthService();
    `;


  }
  public httpService() {
    return `
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:http/http.dart';
import 'dart:convert';

class HttpService {
  String url = "";
  Future<HttpServiceResponse> get(
      {@required String endpoint, Map<String, String> headers}) async {
    try {
      Response response =
          await http.get(url + "/" + endpoint, headers: headers ?? {});
      return validateResponse(response);
    } catch (e) {
      return HttpServiceResponse(success: false, message: "");
    }
  }

  Future<HttpServiceResponse> post(
      {@required String endpoint,
      @required Map<String, dynamic> body,
      Map<String, dynamic> headers}) async {
    try {
      Response response = await http.post(url + "/" + endpoint,
          body: json.encode(body), headers: headers ?? {});
      return validateResponse(response);
    } catch (e) {
      return HttpServiceResponse(success: false, message: "");
    }
  }

  Future<HttpServiceResponse> put(
      {@required String endpoint,
      @required Map<String, dynamic> body,
      Map<String, dynamic> headers}) async {
    try {
      Response response = await http.put(url + "/" + endpoint,
          body: json.encode(body), headers: headers ?? {});
      return validateResponse(response);
    } catch (e) {
      return HttpServiceResponse(success: false, message: "");
    }
  }

  Future<HttpServiceResponse> validateResponse(Response response) async {
    String message = "ERROR";
    switch (response.statusCode) {
      case 200:
      case 201:
        return HttpServiceResponse(
            success: true, body: response.body, message: "");
        break;

      default:
        return HttpServiceResponse(success: false, message: message);
    }
  }
}

HttpService httpService = HttpService();

class HttpServiceResponse {
  bool success;
  String message;
  String body;

  HttpServiceResponse({this.success, this.message, this.body});

  HttpServiceResponse.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    message = json['message'];
    body = json['body'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['success'] = this.success;
    data['message'] = this.message;
    data['body'] = this.body;
    return data;
  }
}
    `;


  }
}