package international.idems.plh_teens_tz;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;
import com.baumblatt.capacitor.firebase.auth.CapacitorFirebaseAuth;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    // https://github.com/baumblatt/capacitor-firebase-auth/issues/170
    // https://capacitorjs.com/docs/updating/4-0#change-registerplugin-order
    registerPlugin(CapacitorFirebaseAuth.class);
    super.onCreate(savedInstanceState);
  }
}
