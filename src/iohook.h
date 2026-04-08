#pragma once

#include <napi.h>

// #include <nan_object_wrap.h>

#include "uiohook.h"

class HookProcessWorker : public Napi::AsyncProgressQueueWorker<uiohook_event>
{
  public:
    HookProcessWorker(const Napi::Function& callback);

    ~HookProcessWorker();

    void Cancel();

    const ExecutionProgress* fHookExecution;

  protected:
    void Execute(const ExecutionProgress& progress) override;

    void OnProgress(const uiohook_event *data, size_t count) override;

    void OnOK() override;

  private:
    Napi::FunctionReference callback;
};
