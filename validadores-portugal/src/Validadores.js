import _NIF from "./NIF";
import _Telemovel from "./Telemovel";
import _Email from "./Email";
import _Required from "./Required";
import _Max from "./Max";
import _Today from "./Today";
import _CodigoPostal from "./CodigoPostal";

class Validadores{

    static NIF = _NIF;
    static Email = _Email;
    static Telemovel = _Telemovel;
    static Required = _Required;
    static Max = _Max;
    static CodigoPostal = _CodigoPostal;
    static Today = _Today;

}

window.ValidadoresPortugal =  Validadores;
export default Validadores;